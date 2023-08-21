
import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const Requestwork = () => {
  const [data,setData]=useState([])
  const [image,setimage]=useState([]);
const [requestworkid,setRequestworkid]=useState(null)

  
useEffect((data)=>{
  axios.get('http://localhost:4000/requestwork',{
    headers:{
      'x-token':localStorage.getItem('token')
    }
  }).then(res=>{
    setData(res.data);
    setRequestworkid(res.data.myid);
   
  })

  axios.get('http://localhost:4000/myprofileimage',{
        headers:{
          'x-token':localStorage.getItem('token')
        }
      }).then(res=> {
        
        setimage(res.data)
      }
        
      )


},[])

// const  delmywork=(e)=>{
    
  
//   axios.delete('http://localhost:4000/delmywork/'+e,{
//     headers:{
//       'x-token':localStorage.getItem('token')
//     } 
//   }).then(res=> {
//   alert(res.data)
    
//   }
    
//   )

  
  


//}


const otherimage=e=>{
    axios.get('http://localhost:4000/othersprofileimage/'+ e,{
        headers:{
          'x-token':localStorage.getItem('token')
        }
      }).then(res=> {
        
        setimage(res.data)
       

      }
        
      )
      return image
}
    

const  delreqwork=(e)=>{
    
 
  axios.delete('http://localhost:4000/delreqwork/'+e,{
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
    <h1>Requested Work Status</h1> 
    <br/>

  </div>

<div>
{(data.length>= 1) ?( 
data.map(requestwork=>
  <div>


{image.length ?(
    
    image.map(reqimage=>
      <div>
    
    <img width="10%" height="10%" className='round-image' src={reqimage.myfile} alt="imahe not found" />

  
    
    
    </div>)) : (
    <img width="10%" height="10%" className='round-image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsef7thzQjiXGYs7So3TolzWDcDun_BldzyQ&usqp=CAU" alt="imahe not found" />

    )}


    {/* <img width="15%" height="15%" className='round-image' src={image} alt="imahe not found" /> */}

 
 



<br/>
<h2>{requestwork.name}</h2>

<p>{requestwork.email}</p>

<p>{requestwork.discussion}</p>
<Link to={`/viewprofile/${requestwork.name}/${requestwork.email}/${requestwork.skill}/${requestwork.myid}`} className='btn btn-primary'>View profile</Link>

<button onClick={()=>delreqwork(requestwork._id)} >Delete</button> 


{/* <button className='btn btn-danger' onClick={(requestwork._id)=>{alert(requestwork._id)}}>Delete</button> */}


{/* <input onClick={delmywork(work._id)} type="submit" value='Delete'/> */}

</div>

   
  
  
  )


) :(<h1>NO REQUESTED WORK  YET !!</h1>) }


</div>


    </div>


    
  )
}

export default Requestwork

