



const express= require('express')
const mongoose= require('mongoose')
const userdata=require('./userdatamodal')
const review=require('./reviewdatamodal')
const jwt=require('jsonwebtoken')
const mywork=require('./myworkschema')
const requestwork=require('./requestschema')
const imageSchema=require('./imageschema')

const middleware=require('./middleware')
const cors=require('cors');


const app=express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use(express.json())
app.use(cors({origin:'*'}))


mongoose.connect("mongodb://127.0.0.1:27017").then(()=>{
    console.log("db connected");
})
app.get('/',(req,res)=>{
  return res.send("Hello ammu")
})


app.post('/register',async (req,res)=>{

    try{
       
        const {name,email,password,confirmpassword,mobile,skill} =req.body;
        console.log(name)
        const exist=await userdata.findOne({email});
        console.log(exist)
        if(exist){
           
            return res.status(400).send("User Already Registered");
            
            //anything relates 400 403 is for authentication 
        }
        if(password!=confirmpassword){
            return res.status(403).send("Your password and Confirn password are not matched");
        }
        
        let newuser=new userdata({
            name,email,password,mobile,skill,confirmpassword
        })
      
        newuser.save()
        // res.send(newuser)
        return res.status(200).send("User register successfully");
        //200 is for success code
    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
        //this will just like 404 page not found type 
        //it will diaplay on website page
    }
})




app.post('/updata',async (req,res)=>{

    try{
       
        const {name,email,password,confirmpassword,mobile,skill} =req.body;
        console.log(name)
        const exist=await userdata.findOne({email});
        console.log(exist)
        if(exist){
           
            return res.status(400).send("User Already Registered");
            
            //anything relates 400 403 is for authentication 
        }
        if(password!=confirmpassword){
            return res.status(403).send("Your password and Confirn password are not matched");
        }
        
        let newuser=new userdata({
            name,email,password,mobile,skill,confirmpassword
        })
      
        newuser.save()
        // res.send(newuser)
        return res.status(200).send("User register successfully");
        //200 is for success code
    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
        //this will just like 404 page not found type 
        //it will diaplay on website page
    }
})


app.post('/editprofile',middleware,async(req,res)=>{
    try{
       
  
        const data= await userdata.findByIdAndUpdate(req.user.id,req.body,{new:true,runValidators:true,context:'query'})
         return res.send("Edited SuccessFully")
       
       
        
    }
    catch(err){
        console.log("the err is in edit image"+err);
        return res.status(500).send("server error in edit image");
    }
})

app.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;

        const checkMail= await userdata.findOne({email})
        if(!checkMail){
                       
            return res.status(400).send("Please Register First");
        }
    
       if(password!=checkMail.password){
            return res.status(400).send("Invalid Password");
        }

        let payload ={
            user:{
                id:checkMail.id
            }
        }
        //time in milli seconds 
        // arrow function is for generating the token 
        jwt.sign(payload,'jwtpassword',{expiresIn:3600000000},(err,token)=>{
            if(err)
            {
                throw err 
            }
            //console.log({token})
            return res.json({token})

        })
        //here password is used to decode the token in future


    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
    }
})

// in this after verifivation of middleware only we can go to allprofiles
app.get("/allprofile",middleware,async (req,res)=>{
    try{
        
        let allprofile=await userdata.find();
        return res.json(allprofile);

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
    }
})

app.get('/myprofile',middleware,async (req,res)=>{
    try{
        
        let myprofile=await userdata.findById(req.user.id);
        return res.json(myprofile);

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
    }
    
})



app.get('/searchprofile/:name',async(req,res)=>{
    try{
       
        
        let search =await userdata.find({$or:[{"name":{$regex:req.params.name}},{"email":{$regex:req.params.name}},{"mobile":req.params.name},{"skill":{$regex:req.params.name}}]});

       
         return res.status(200).json(search);

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
    }
})

app.post('/addreview',middleware,async (req,res)=>{
    try{
        
       const {tasktaker,rating,comment}=req.body;
       const exist = await userdata.findById(req.user.id);
       const reviewdata= new review({
        taskgiver:exist.name,
        tasktaker,rating,comment

       })

       reviewdata.save()
       return res.status(200).send("Review updated successfully ");

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
    }
    
})


app.get('/view/:id',async(req,res)=>{
    try{
        
        let reviews =await review.find({"tasktaker":req.params.id});

      
         return res.status(200).json(reviews);

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
    }
})


app.get('/myreview',middleware,async (req,res)=>{
    try{
        
        let allreview =await review.find();

        let myreview=allreview.filter(review=>review.tasktaker.toString()=== req.user.id.toString())

   
         return res.status(200).json(myreview);

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error");
    }
    
})



// app.post('/uploadimage',async (req,res)=>{
   
//    const body=req.body;
   

//    try{
       
//         const uploadimage= await new imageSchema(
//             body
//         )
      
//         uploadimage.save()
       
//         return res.send("image successfully");
    
//     }
//     catch(err){
//         console.log("the err is "+err);
//         return res.status(500).send("image  server error");
        
//     }
// })



app.post('/uploadimage',async (req,res)=>{
   
    const body=req.body;
    
 
    try{
        const v= await  imageSchema.find({"id":body.id})
      
 
        if(v){
 const updateimage= await imageSchema.findOneAndUpdate({"id":body.id},{"myfile" : body.myfile})
 return res.send("Uploaded Successfully")
         }
 
         else{
             const uploadimage= await new imageSchema(
                 body
             )
           
             uploadimage.save()
            
             return res.send("image Uploaded  successfully");
         }
     }
     catch(err){
         console.log("the err is "+err);
         return res.status(500).send("image  server error");
         
     }
 })

app.get('/searchimage/:id',async (req,res)=>{
   
    try{
      
        let images =await imageSchema.find({"id":req.params.id});

      
         return res.status(200).json(images);

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error in Search image");
    }
    
})



app.get('/myprofileimage',middleware,async (req,res)=>{
    
        
        try{
      
            let images =await imageSchema.find({"id":req.user.id});
    
          
             return res.status(200).json(images);
    
        }
        catch(err){
            console.log("the err is "+err);
            return res.status(500).send("server error in Search image");
        }
    
})



app.get('/othersprofileimage',async (req,res)=>{
    
        
    try{
  
        let images =await imageSchema.find({"id":req.user.id});

      
         return res.status(200).json(images);

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error in Search image");
    }

})



app.post('/addmywork',async (req,res)=>{

    try{
       
        const {status,name,email,mobile,skill,discussion,taskgiverid} =req.body;
 
 
        let work= new mywork({
            status,name,email,mobile,skill,discussion,taskgiverid
        })
      
        work.save()
    
        return res.status(200).send("Send the Message Successfully");
    }
    catch(err){
        console.log("the err in work section "+err);
        return res.status(500).send("server error");
       
    }
    
})




app.post('/addrequestwork',async (req,res)=>{

    try{
       
        const {myid,name,email,mobile,skill,discussion,requestedid} =req.body;
 
 
        let request= new requestwork({
            myid,name,email,mobile,skill,discussion,requestedid
        })
      
        request.save()
    
        return res.status(200).send("Send the Message Successfully");
    }
    catch(err){
        console.log("the err in requested section  "+err);
        return res.status(500).send("server error");
       
    }
    
})

app.get('/mywork',middleware,async (req,res)=>{
    try{
     const work= await mywork.find({"status":req.user.id})
     return res.json(work)
    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error in mywork ");
       
    }
})


app.get('/requestwork',middleware,async (req,res)=>{
    try{
     const reqwork= await requestwork.find({"requestedid":req.user.id})
     return res.json(reqwork)
    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error in mywork ");
       
    }
})


app.delete('/delmywork/:id/',async (req,res)=>{

    try{
     
        const delwork = await mywork.findByIdAndDelete(req.params.id)
        return res.send("seccessfully deleted")

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error in delete mywork ");
       
    }
    
})

app.delete('/delreqwork/:id/',async (req,res)=>{

    try{
     
        const delreqwork = await requestwork.findByIdAndDelete(req.params.id)
        return res.send("seccessfully deleted")

    }
    catch(err){
        console.log("the err is "+err);
        return res.status(500).send("server error in delete mywork ");
       
    }
    
})

app.listen(4000,()=>{
    console.log("server running successfully ");
})