
import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

const Editprofile = () => {
    
    const [editdata,setEditdata]=useState({
        name:'',
        email:'',
        mobile:'',
        skill:'',
        password:'',
        confirmpassword:'',
      });
      const [data,setData]=useState(null)

      useEffect(()=>{
        axios.get('http://localhost:4000/myprofile',{
          headers:{
            'x-token':localStorage.getItem('token')
          }
        }).then(res=>setData(res.data))
    },[])

 
      const changeHandler =e=>{
        setEditdata({...editdata,[e.target.name]:e.target.value})
      }
      const submitHandler=e=>{
        e.preventDefault();
        console.log(editdata);
        axios.post('http://localhost:4000/editprofile',editdata,{
          headers:{
            'x-token':localStorage.getItem('token')
          }
        }).then(res=> alert(res.data))

    }

  return (
    <div>
    <nav className='navbar bg-dark' >
    <h1>
        <Link to='/'><i className="fas fa-code"></i>Ammu Website</Link>
    </h1> 
    <ul>
    <li><Link to="myprofile">Myprofile</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Logout</Link></li>
    </ul>
  </nav>
{data &&
  <section className='container' style={{"textAlign":"center"}}>
        <br/>
        <h1 className='large text-primary'> EDIT DETAILS </h1><br/>
        
        <form className='form' onSubmit={submitHandler} autoComplete='off'>
            <div className='form-group'>
              Name    :  <input type="text"   placeholder={data.name} name="name" onChange={changeHandler} required/><br/>

            </div>
            <div className='form-group'>
                Email  : <input type="email"  placeholder={data.email} name="email" onChange={changeHandler}  required/><br/>

            </div>
            <div className='form-group'>
               Mobile no: <input type="text"  placeholder={data.mobile} name="mobile" onChange={changeHandler}  /><br/>
                
            </div><br/>
    
            <div className='form-group'>
                 Skills : <input type="text"  placeholder={data.skill} name="skill" onChange={changeHandler}  /><br/>
                <small className='form-group'>skill should be add as string seperated by (,)<br/></small>
            </div>
            <div className='form-group'>
                Password: <input type="password" placeholder={data.password} name="password" onChange={changeHandler}  /><br/>
                
            </div>
            <div className='form-group'>
             confirmpassword:    <input type="password"  placeholder={data.confirmpassword} name="confirmpassword" onChange={changeHandler}  /><br/>
                
            </div>



            
           <input type="submit" className='btn btn-primary' value="Update"/>
            </form>
            </section>
}

    </div>
  )
}

export default Editprofile
