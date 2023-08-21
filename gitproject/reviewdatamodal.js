const mongoose=require('mongoose')

const review=new mongoose.Schema({
    taskgiver:{
        type:String,
        required:true,
    },
    tasktaker:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
    }
})

module.exports= mongoose.model('review',review);