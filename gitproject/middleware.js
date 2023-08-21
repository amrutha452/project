const jwt=require('jsonwebtoken')

module.exports= (req,res,next)=>{
    try{
        let token=req.header('x-token')
        //console.log(token)
        if(!token){
            return res.status(400).send("token not available")
        }
        let decode = jwt.verify(token,'jwtpassword');
        //the password given in jwt sign
        //it will get one object that is user which we havre created in payload
        
        req.user=decode.user;
        //console.log(req.user)
        next();
        // next is to pass entire one to another variable 
    }
    catch(err){ 
      console.log("err is: "+err)
      return res.status(400).send("Authentication error in middleware")
    }
}