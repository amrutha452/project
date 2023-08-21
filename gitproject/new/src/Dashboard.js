

import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './index.css';
///props used to send param to access in url data

const Dashboard = () => {
  const [data,setData]=useState([]);
const [len,setLen]=useState(null)
const [count,setCount]=useState(null)
  const [val,setVal]=useState(null);

  useEffect((data)=>{
    axios.get('http://localhost:4000/allprofile',{
      headers:{
        'x-token':localStorage.getItem('token')
      }
    }).then(res=>{
      setData(res.data);
     
    })
    axios.get('http://localhost:4000/mywork',{
      headers:{
        'x-token':localStorage.getItem('token')
      }
    }).then(res=>{
      setLen(res.data.length);
     
    })
    axios.get('http://localhost:4000/requestwork',{
      headers:{
        'x-token':localStorage.getItem('token')
      }
    }).then(res=>{
      setCount(res.data.length);
     
    })
   
  },[])

  const changeHandler =e=>{
    setVal(e.target.value)
   
  }

  const submitHandlerDashboard =e =>{
    
 
   axios.get('http://localhost:4000/allprofile',{
     headers:{
       'x-token':localStorage.getItem('token')
     }
   }).then(res=>{
     setData(res.data);
  
   })
   

    
 }

  const submitHandler =e =>{
     e.preventDefault()
     
    axios.get('http://localhost:4000/searchprofile/'+val,{
      headers:{
        'x-token':localStorage.getItem('token')
      }
    }).then(res=>{
      setData(res.data);
      
    })
    
    
  }
 
if(!localStorage.getItem('token')){
  return <Redirect to="/login" />
}
 
  return (
    <div>
     <nav className='navbar bg-dark' >
        <h1>
            <Link to='/'><i className="fas fa-code"></i>Ammu Website</Link>
        </h1> 
        <ul>
            <li><Link to="myprofile">Myprofile</Link></li>
            <li><Link to="editprofile">Edit</Link></li>
            <li><Link to="test">EditImage</Link></li>
            <li><Link to="mywork" >Mywork <sup style={{"background":"white","borderRadius":"40%","padding":"0 5%"}}>{len}</sup></Link></li>
            <li><Link to="requestwork" >Request<sup style={{"background":"white","borderRadius":"40%","padding":"0 5%"}}>{count}</sup></Link></li>

            <li><Link to="dashboard" onClick={submitHandlerDashboard}>Dashboard</Link></li>
            <li><Link to="/login" onClick={()=>localStorage.removeItem('token')}>LogOut</Link></li>
        </ul>
      </nav>

      <center>
        <br/><br/>
      <form  className='form' onSubmit={submitHandler} autoComplete='off'>
     
        <input type="text" name="text" placeholder={val} onChange={changeHandler}/>
         <input type="submit"   className="btn btn-primary" value="Search"/>

    </form>
    </center>
 

      <section className='container' style={{"textAlign":"center"}}>
        <br/>
        <h1 className='large text-primary'>Developers</h1><br/>
        <p className='lead'>Browse and connect with developers</p><br/>
       
        <div className='profiles'>

{data.length>=1 ? 
          data.map(profile =>
            
            
        <div className='profile bg-light'>
        <img width="35%" height="35%" className='round-image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsef7thzQjiXGYs7So3TolzWDcDun_BldzyQ&usqp=CAU" alt="imahe not found" />
      
      <div >
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <p>India</p>
      <ul style={{"textAlign":"center","display":"flex","textDecoration":"none"}}>
      {
        profile.skill.split(',').map(skill=>
          <li className='text-secondary'>{skill}</li>
        )
      }
     </ul>
      <Link to={`/viewprofile/${profile.name}/${profile.email}/${profile.skill}/${profile._id}`} className='btn btn-primary'>View profile</Link>
      </div><br/>
    
    </div>
   )
          
          : <h1>No Matching Results Found</h1>}

         </div>
        </section>

    </div>
  )
}

export default Dashboard
