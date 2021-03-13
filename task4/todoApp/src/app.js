//instaled packages
const express = require('express')
const hbs = require('hbs')
const path = require('path')
//const fetch = require('node-fetch');
//const { json } = require('express');
//custom variables
const PORT = 3000
//create instance from express
const app = express()
//set default engine for dynamic html files
app.set('view engine', 'hbs')
//get public and views and partials paths
const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../frontend/views')
const partialsDir = path.join(__dirname,'../frontend/partials')
//set use of public and views and partials paths
app.use(express.static(publicDir))
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)
const tasks = []
//routes

app.get('', (req, res)=>{
    res.render('home',{
        pageName: 'home page',
        userName:'alaa aziz'
    })
})
app.get('/allPosts', async (req,res)=>{
    try{
        fData = await fetch('https://jsonplaceholder.typicode.com/posts')
        posts=await fData.json()
        res.render('allPosts',{
            posts: posts
        })
    }
    catch(e){
        res.redirect('404')
    }
})
app.get('/allPosts/:id', async(req,res)=>{
    id=req.params.id
    try{
        fData = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        post =await fData.json()
        res.render('singlePost',{
            post: post
        })
    }
    catch(e){
        res.redirect('404')
    }
})
app.get('/allProducts', async(req,res)=>{
    try{
        fData = await fetch('http://backtest.achilleseg.com/api/ProductsUpdated?lang_id=1&page=0&limit=12')
        jsonData = await fData.json()
        products = jsonData.result.product_data
        res.render('allpro', {
            data: products
        })    
    }
    catch(e){
        res.render('404')
    }
    // fetch('http://backtest.achilleseg.com/api/ProductsUpdated?lang_id=1&page=0&limit=12')
    // .then(data=>{ 
    //     data.json()
    //     .then(newdata=>{
    //         let d = newdata.result.product_data
    //         res.render('allpro', {
    //             data:d
    //         })
    //     })
    // })
    // .catch(e=>console.log(e))
    // res.render('allpro')
})
app.get('/allProducts/:id', async(req,res)=>{
    id= req.params.id
    try{
        fData = await fetch(`http://backtest.achilleseg.com/api/ProductsUpdated?lang_id=1&page=0&limit=12&&product_id=${id}`)
        jsonData = await fData.json()
        products = jsonData.result.product_data
        res.render('allpro', {
            data: products
        })    
    }
    catch(e){
        res.render('404')
    }
})
app.get('/addNewCustomer', (req,res)=>{
    if(req.query.title && req.query.body){
        customer = {
            title: req.query.title,
            body: req.query.body
        }
        customers.push(customer)
        res.redirect('/allCustomers')
    }
    res.render('addCustomer')
})
app.get('/allCustomers', (req, res)=>{    
    res.render('allCustomers',{
        pageName: 'All Customers',
        customers: customers,
    })
})
app.get('/allCustomers/:id', (req, res)=>{
    const id = req.params.id
    res.render('singleCustomer',{
        pageName: 'Single Customer',
        customer : customers[id] //{title:'sh', body:'gedvh', userId:'hh'}
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        pageName: '404 error'
    })
})
app.get('/deleteCustomer', (req,res)=>{
    if(req.query.title && req.query.body){
        customer = {
            title: req.query.title,
            body: req.query.body
        }
        customers.push(customer)
        res.redirect('/allCustomers')
    }
    res.render('deleteCustomer')
})
//run server
app.listen(PORT)










