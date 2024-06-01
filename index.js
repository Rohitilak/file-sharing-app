const express = require('express');
const fileRoutes = require('./routes/file')
const mongoose = require('mongoose');

const app = express();

// app.use(express.urlencoded())

app.use(express.json())

app.use(fileRoutes)
mongoose.connect('mongodb://localhost:27017/filesharingapp')
.then(()=> console.log("connection stablished"))
.catch(err => console.log("error while stablishing the connection", err))

app.listen(8080, ()=>{
    console.log("Your app is up and running on post 8080");
})