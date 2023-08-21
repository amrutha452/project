
import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Link,useHistory,Redirect} from 'react-router-dom';

import axios from 'axios';
const Register = () => {
      const history=useHistory()

      const [data,setData]=useState({
        name:'',
        email:'',
        mobile:'',
        skill:'',
        password:'',
        confirmpassword:'',
      });
  
    
      


     
      const changeHandler =e=>{
        setData({...data,[e.target.name]:e.target.value})
      }
      const submitHandler=e=>{
        e.preventDefault();
        console.log(data);
        axios.post('http://localhost:4000/register',data,{
          headers:{
            'x-token':localStorage.getItem('token')
          }
        }).then(res=> alert(res.data))

  }
   
    // if(!localStorage.getItem('token')){
    //   return <Redirect to="/login" />
    // }
    
  
  return (
    <div>
      
      <nav className='navbar bg-dark' >
        <h1>
            <Link to='/'><i className="fas fa-code"></i>Ammu Website</Link>
        </h1> 
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <section className='container' style={{"textAlign":"center"}}>
        <br/>
        <h1 className='large text-primary'>Sign up </h1><br/>
        <p className='lead'>create your account</p><br/>
        <form className='form' onSubmit={submitHandler} autoComplete='off'>
            <div className='form-group'>
                <input type="text" placeholder='enter name' name="name" onChange={changeHandler} required/><br/>

            </div>
            <div className='form-group'>
                <input type="email" placeholder='enter email' name="email" onChange={changeHandler}  required/><br/>

            </div>
            <div className='form-group'>
                <input type="text" placeholder='mobile' name="mobile" onChange={changeHandler}  /><br/>
                
            </div><br/>
    
            <div className='form-group'>
                <input type="text" placeholder='skill' name="skill" onChange={changeHandler}  /><br/>
                <small className='form-group'>skill should be add as string seperated by (,)<br/></small>
            </div>
            <div className='form-group'>
                <input type="password" placeholder='password' name="password" onChange={changeHandler}  /><br/>
                
            </div>
            <div className='form-group'>
                <input type="password" placeholder='confirm password' name="confirmpassword" onChange={changeHandler}  /><br/>
                
            </div>



            
           <input type="submit" className='btn btn-primary' value="register"/>
            </form>
            <p className='my-1'>
            Already  have an account? <Link to="/login" >Login/Signin</Link>
         </p>
        </section>

    </div>
  )
}

export default Register;


















