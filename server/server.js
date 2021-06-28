const express = require('express')
const {router }= require('./routes')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.json())
const port = 5001

//app.use(bodyParser.urlencoded({ extended: false }))
app.use("/",router)

// app.use('/user', (req,res)=> {
//     console.log("User route : ",req.body)   
// })

app.listen({port},()=> {
    console.log("server is up on port ",port)
})