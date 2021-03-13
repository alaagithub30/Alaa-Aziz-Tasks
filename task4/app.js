const express = require('express')
const app = express()

//routes
// get post patch or put  delete
//localhost:3000 www.x.com
app.get('', (req, res)=>{
    res.send('hello world')
})
app.get('/services',(request, response)=>{
    response.send('<h2>services</h2>')
})
app.get('/json', (req, res)=>{
    res.send({
        name:'alaa', age:27
    })
})
app.listen(3000, ()=>{console.log('server on 3000')})
