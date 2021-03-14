const express = require('express')
require('./db/mongoose')
const app = express()
const userModel = require('./models/user')
x=new userModel({
    fname:'marwa', 
    lname:'radwan', 
    phone:"01234567891",
    country:'iraq', 
    password:"123456", 
    email:"test@test.com",
    username:"xyz1"
})
x.save().then(()=>{}).catch(e=>{console.log(e)})
app.use(express.json())

module.exports = app

