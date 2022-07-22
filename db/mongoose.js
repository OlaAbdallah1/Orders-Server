const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Orders').then((ans)=>{
    console.log("connected")
}).catch((err)=>{
    console.log("not connected")
})