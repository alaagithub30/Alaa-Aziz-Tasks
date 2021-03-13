const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
app.set('view engine', 'hbs')
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname,'../frontend/views')
const layoutDir = path.join(__dirname, '../frontend/layouts')
app.use(express.static(publicDir))
app.set('views', viewsDir)
hbs.registerPartials(layoutDir)
app.get('', (req,res)=>{
    res.render('home', {
        name:'alaa'
    })
})
app.listen(3000)