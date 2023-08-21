import React ,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [auth ,setAuth]=useState(false)
  const [data,setData]=useState({
    email:'',
    password:'',
  })
  const changeHandler =e=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandler=e=>{
    e.preventDefault();
    axios.post('http://localhost:4000/login',data).then(
      res=>{
        // console.log(res.data)
          localStorage.setItem('token',res.data.token);
          setAuth(true)
      }
    
    )

  }
    if(auth){
    return <Redirect to="/dashboard" />
  }

  //another way (state auth place lo ee code use chesukovachu ) state use cheste delayy vundadhu 
  // if(localStorage.getItem('token')){
  //   return <Redirect to="/dashboard" />
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
        <br/><br/><br/><br/><br/>
        <h1 className='large text-primary'>Sign in </h1><br/>
        <p className='lead'>Sign into your account</p><br/>
        <form className='form' onSubmit={submitHandler} autoComplete='off'>
            <div className='form-group'>
                <input type="email" placeholder='enter email' name="email" onChange={changeHandler} required/><br/><br/>

            </div>
            <div className='form-group'>
                <input type="password" placeholder='enter password' name="password" onChange={changeHandler} /><br/>
                
            </div>
            <br/>
            {/* <Link to="/login" className='btn btn-danger'>Login </Link><br/><br/> */}
            <input type="submit" className='btn btn-primary' value="Login"/>

        </form>
         <p className='my-1'>
            Dont have an account? <Link to="/register" >Sign Up</Link>
         </p>

      </section>

    </div>
  )
}

export default Login;
