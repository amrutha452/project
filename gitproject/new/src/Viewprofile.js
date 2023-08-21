

import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Link,Redirect} from 'react-router-dom';

import axios from 'axios';

const Viewprofile = ({match}) => {


    const [data,setData]=useState(null);
    const [review,setReview]=useState([])
    const [rating,setRating]=useState(null);
    const [taskgiver,setTaskgiver]=useState(null);
    const [comment,setComment]=useState(null);
    const [myimage,setMyimage]=useState([]);
    const [work,setWork]=useState('')
    const [workid,setWorkid]=useState(null)
    const [requestwork,setRequestwork]=useState('')
    const [requestworkid,setRequestworkid]=useState(null)

    useEffect(()=>{
      axios.get('http://localhost:4000/myprofile',{
        headers:{
          'x-token':localStorage.getItem('token')
        }
      }).then(res=>setData(res.data))
  

      axios.get('http://localhost:4000/myprofile',{
        headers:{
          'x-token':localStorage.getItem('token')
        }
      }).then(res=> setWorkid(res.data._id))
    
      let reviewobj={
        taskgiver,
        tasktaker:match.params.id,
        rating,
        comment
    }


      axios.get('http://localhost:4000/view/'+reviewobj.tasktaker,{
        headers:{
          'x-token':localStorage.getItem('token')
        }
      }).then(res=> setReview(res.data))
  
      var imageobj={
        id:match.params.id
      }
  
        axios.get('http://localhost:4000/searchimage/'+imageobj.id,{
          headers:{
            'x-token':localStorage.getItem('token')
          }
        }).then(res=> 
          setMyimage(res.data)
          
        )
        
    },[])
  

    // const submitHandler =e=>{


      
    //   axios.get('http://localhost:4000/myprofile',{
    //     headers:{
    //       'x-token':localStorage.getItem('token')
    //     }
    //   }).then(res=> setTaskgiver(res.data.name))
    
  

    // }
  

  
    


   
const changemyworkHandler =e=>{
      setWork(e.target.value)
    }
    const myworksubmit=e=>{
   
      let myworkobj={
        status:match.params.id,
        name:data.name,
        email:data.email,
        mobile:data.mobile,
        skill:data.skill,
        discussion:work,
        taskgiverid:workid
    }
    axios.post('http://localhost:4000/addmywork',myworkobj,{
    headers:{
      'x-token':localStorage.getItem('token')
    }
  }).then(res=> alert(res.data))


}
  

   
const changerequestworkHandler =e=>{
  setRequestwork(e.target.value)
}
const requestworksubmit=e=>{

  let reqworkobj={
    requestedid:match.params.id,
    name:data.name,
    email:data.email,
    mobile:data.mobile,
    skill:data.skill,
    discussion:requestwork,
    myid:workid
}
axios.post('http://localhost:4000/addrequestwork',reqworkobj,{
headers:{
  'x-token':localStorage.getItem('token')
}
}).then(res=> alert(res.data))


}



const submitHandler =e=>{
  axios.get('http://localhost:4000/myprofile',{
    headers:{
      'x-token':localStorage.getItem('token')
    }
  }).then(res=> setTaskgiver(res.data.name))
  

    let reviewobj={
        taskgiver,
        tasktaker:match.params.id,
        rating,
        comment
    }
    axios.post('http://localhost:4000/addreview',reviewobj,{
    headers:{
      'x-token':localStorage.getItem('token')
    }
  }).then(res=> alert(res.data))


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
<h2>{match.params.name}</h2>
<br/>
<p>{match.params.email}</p>
<br/>
<p>{match.params.skill}</p>

</div>


<div className='profile-github' >
<br/>
<h2 className='text-primary my-1'>Review and Rating </h2>
<div >

{ review.length >=1 ? 

review.map(review=>
  <div>
<br/>

    <h4><Link to={`/viewprofile/${review.taskgiver}/${review.taskgiver}/${review.taskgiver}/${review.taskgiver}`} >{review.taskgiver}</Link></h4>
    <br/>
    <p>{review.rating}/5</p>
    <p>{review.comment}</p>
</div>
)
: <p>No Review Given</p>}


</div> 
<div>
<div>
    <h4>Enter your Review</h4>
    <form className='form' onSubmit={submitHandler} autoComplete='off'>
     
     <div className='form-group'>
        <input type="text" placeholder="Enter your Rating out of 5" onChange={e=>setRating(e.target.value)} name="rating" width="100" required/>

     </div>
     <br/>
     <br/>
     <h2>Enter Your Comment on his work</h2>
     <div>
      <textarea placeholder='Enter your comment...' onChange={e=>setComment(e.target.value)}></textarea>
     </div>
     <br/>
<input type="submit"   className="btn btn-primary" value="Add Rating"/>
<br/><br/>
    </form>


    <div>
      <form onSubmit={myworksubmit}> 
      <h1>Want's To Hire?</h1><br/>
       <input type="text" name="discussion" onChange={changemyworkHandler} placeholder='Enter your discusiion' width="100%" /><br/><br/>
       <input type="submit" value="Select"  className='btn btn-primary'/>
      </form>
    </div>

    <div>
      <form onSubmit={requestworksubmit}> 
      <h1>Request To hire?</h1><br/>
       <input type="text" name="discussion" onChange={changerequestworkHandler} placeholder='Enter your discusiion' width="100%" /><br/><br/>
       <input type="submit" value="Select"  className='btn btn-primary'/>
      </form>
    </div>



</div>
</div>

</div>

</div>
}
</section>
</div>
    
  )
}

export default Viewprofile