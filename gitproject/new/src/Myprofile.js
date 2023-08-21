

import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Link,Redirect} from 'react-router-dom';

import axios from 'axios';

const Myprofile = () => {

  const [data,setData]=useState(null);
  const [review,setReview]=useState([])
  const [myimage,setMyimage]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:4000/myprofile',{
      headers:{
        'x-token':localStorage.getItem('token')
      }
    }).then(res=>setData(res.data)
      
      
    )

    axios.get('http://localhost:4000/myreview',{
      headers:{
        'x-token':localStorage.getItem('token')
      }
    }).then(res=> setReview(res.data))

   

      axios.get('http://localhost:4000/myprofileimage',{
        headers:{
          'x-token':localStorage.getItem('token')
        }
      }).then(res=> {
        
        setMyimage(res.data)
      }
        
      )

  },[])

  

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
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Logout</Link></li>
    </ul>
  </nav>

    
<section className='container' style={{"textAlign":"center"}}>
<br/><br/><br/><br/><br/>
<Link to="/dashboard" className='btn btn-primary'>Dashboard</Link>

{data && 
<div className='profile-grid my-1'>

<div className='profile-top bg-secondary p-2 '>




{myimage.length ?(
    
    myimage.map(myimage=>
      <div>
    
    <img width="25%" height="25%" className='round-image' src={myimage.myfile} alt="imahe not found" />

  
    
    
    </div>)) : (
    <img width="25%" height="25%" className='round-image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsef7thzQjiXGYs7So3TolzWDcDun_BldzyQ&usqp=CAU" alt="imahe not found" />

    )}



<br/>
<h2>{data.name}</h2>
<br/>
<p>{data.email}</p>
<br/>
<p>India</p>

</div>


<div className='profile-github' >
<br/>
<h2 className='text-primary my-1'>Review and Rating </h2>
<div >

{review.length ?(
review.map(review=>
  <div>
<br/>
    <h4><Link to="#" >{review.taskgiver}</Link></h4>
    <br/>
    <p>{review.rating}/5</p>
    <p>{review.comment}</p>
</div>)) : (
<p>No review yet</p>
)}

<br/><br/><br/>
</div>
<div>
<div>

    
</div>
</div>

</div>

</div>
}
</section>
</div>
  )
}

export default Myprofile