const mongoose=require('mongoose')

const imageSchema= new  mongoose.Schema(
{
    id:String,
myfile:String
}
)

module.exports= mongoose.model('image',imageSchema)