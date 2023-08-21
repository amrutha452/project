import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
const Home = () => {
  return (
    <div className='homecss'>
      <nav className='navbar' >
        <h2>
            <Link style={{"textDecoration": "none",color:"black"}} to='/'><i className="fas fa-code"></i>Job-Connect</Link>
            </h2>
        <ul className='nav-ul'>
            <li ><Link style={{"textDecoration": "none",color:"black"}} to="/register">Register</Link></li>
            <li><Link style={{"textDecoration": "none",color:"black"}} to="/login">Login</Link></li>
        </ul>
      </nav>
       <section className='landing' >
        
        <div className='dark-overlay'>
        <div className='landing inner' style={{"textAlign":"center"}}>
            <br/><br/> <br/><br/>
         <h1 className='titlecss'>Job-Connect</h1>
         <br/>
         <br/>
         <p className='titleslogan'>
         Middleware Between You And Your Dream Job
         </p>
         <br/>
         <div className='buttons'>
         <Link to="/register" ><button className='btncss1'>Sign Up</button></Link>
         <Link to="/login"><button className='btncss2'>Login</button></Link>
         </div>
        </div>
        </div>
       </section>
      
    </div>
  )
}

export default Home;



