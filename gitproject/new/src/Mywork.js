
import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
const Mywork = () => {
  const [data,setData]=useState([])
  const [myimage,setMyimage]=useState([]);
  const [workid,setWorkid]=useState(null)
  // const [requestid,setRequestid]=useState(null)
  
useEffect((data)=>{
  axios.get('http://localhost:4000/mywork',{
    headers:{
      'x-token':localStorage.getItem('token')
    }
  }).then(res=>{
    setData(res.data);
   
  })
    axios.get('http://localhost:4000/myprofileimage',{
        headers:{
          'x-token':localStorage.getItem('token')
        }
      }).then(res=> {
        
        setMyimage(res.data)
      }
        
      )

},[])


const  delmywork=(e)=>{
    
 
  axios.delete('http://localhost:4000/delmywork/'+e,{
    headers:{
      'x-token':localStorage.getItem('token')
    } 
  }).then(res=>{alert(res.data)
    window.location.reload()
    
  })
  
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

  <div>
    <br/>
    <h1>Current Work Status</h1> 
    <br/>

  </div>

<div>
{(data.length>= 1) ?( 
data.map(work=>
  <div>


{myimage.length ?(
    
    myimage.map(image=>
      <div>
    
    <img width="25%" height="25%" className='round-image' src={image.myfile} alt="imahe not found" />

  
    
    
    </div>)) : (
    <img width="25%" height="25%" className='round-image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsef7thzQjiXGYs7So3TolzWDcDun_BldzyQ&usqp=CAU" alt="imahe not found" />

    )}



<br/>
<h2>{work.name}</h2>

<p>{work.email}</p>
<p>{work._id}</p>
<p>{work.discussion}</p>
<Link to={`/viewprofile/${work.name}/${work.email}/${work.skill}/${work.taskgiverid}`} className='btn btn-primary'>View profile</Link>


 
<button onClick={()=>delmywork(work._id)} >Delete</button> 

</div>

   
  
  
  )


) :(<h1>NO REQUEST YET !!</h1>) }


</div>


    </div>


    
  )
}

export default Mywork

