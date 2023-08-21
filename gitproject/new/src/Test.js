import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
const Test = () => {

  const [data,setData]=useState(null);

  const [image,setImage]=useState({id:"",myfile:""})

  useEffect(()=>{
    axios.get('http://localhost:4000/myprofile',{
      headers:{
        'x-token':localStorage.getItem('token')
      }
      
      

    }).then(res=>setData(res.data))

   

    
  },[])


const createPost =async (newimage)=>{
  try{
    axios.post('http://localhost:4000/uploadimage',newimage).then((res)=>{
     alert(res.data)
  })
  }catch(err){
    console.log(err)
  }
}

 
  const changeImage=async(e)=>{
   const file=e.target.files[0];
   const base64=await fun(file)
   
   setImage({ ...image,id:data,myfile : base64})
  
  }

   const uploadimage=(e)=>{
   e.preventDefault()
  createPost(image)

   
   }

   const fun=(file)=>{
    return new Promise((resolve,reject)=>{
      
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      
      resolve(reader.result)
    
    }
    reader.onerror=(error)=>{
      reject(error);
    }
    })
   }


  return (
    <div > 
         <nav className='navbar bg-dark' >
    <h1>
        <Link to='/'><i className="fas fa-code"></i>Ammu Website</Link>
    </h1> 
    <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Logout</Link></li>
    </ul>
  </nav>
  <br/><br/>

    <center><h1>Upload your Image Here</h1></center><br/><br/>
    <form >
      {/* // accept="image/*" */}
      {image ===""||image===null ? "no image": <img alt="" src={image.myfile} width={100} height={100}/>}

      {/* <center>{image ===""||image===null ? "no image": <img style={{"borderRadius":"50%","border":"2px solid black"}}  src={image.myfile} width={200} height={200}/>}  </center> */}
<br/>
<br/>
    <center><input  type="file" name="image" accept='image/*' onChange={changeImage}/>
    <br/><br/>
    <button onClick={uploadimage} className='btn btn-primary'>Upload</button><br/>
    </center>
    </form>
 
  

  

    </div>
  )
}

    

   
   
  


 

export default Test;
