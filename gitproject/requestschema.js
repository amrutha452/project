const mongoose=require('mongoose')
const requestwork=new mongoose.Schema({
    requestedid:{
        type:String
    },
    myid:{
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

module.exports= mongoose.model('requestwork',requestwork)