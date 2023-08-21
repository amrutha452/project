const mongoose=require('mongoose')
const mywork=new mongoose.Schema({
    status:{
        type:String
    },
    taskgiverid:{
        type:String,
        
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    
    mobile:{
        type:String,
        required:true,
    },
    skill:{
        type:String,
        required:true,
    },
    discussion:{
        type:String,
        
    }

    

})

module.exports= mongoose.model('mywork',mywork)