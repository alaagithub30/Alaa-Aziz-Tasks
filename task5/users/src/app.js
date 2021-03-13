const express = require('express')
const path = require('path')
const hbs = require('hbs')
const myMethods = require('./utils/functions')
const app= express()
const PORT = process.env.PORT

app.set('view engine', 'hbs')

const myPublicFiles = path.join(__dirname, '../public')
const myViewsFiles = path.join(__dirname, '../template/views')
const myPartialsFiles = path.join(__dirname, '../template/layouts')

app.use(express.static(myPublicFiles))
app.set('views', myViewsFiles)
hbs.registerPartials(myPartialsFiles)

app.get('',(req,res)=>{
    if(req.query.name && req.query.phone) {
        user = {
            name:req.query.name,
            email:req.query.email,
            phone:req.query.phone,
            msg:req.query.msg
        }
        myMethods.addUser(user)
        return res.redirect('/showAll')
    }
    res.render('index')
})

app.get('/showAll', (req,res)=>{
    myMethods.showAll((err,data)=>
        {
            console.log(data)
            res.render('alldata', {data})
        }
    )

})

app.get('/showAll/:id',(req,res)=>{
    id = req.params.id
    myMethods.showSingle(id, (err,data)=>{
        res.render('single', {data})
    })
})

app.get('/deleteUser/:id', (req,res)=>{
    user = req.params.id
    myMethods.deleteUser(user)
    res.redirect('/showAll')
})
app.listen(PORT)