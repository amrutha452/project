import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Mywork from './Mywork';
import Login from './Login'; 
import Home from './Home';
import Dashboard  from './Dashboard';
import Myprofile from './Myprofile';
 import Viewprofile from './Viewprofile';
 import Test from './Test';
 import Editprofile from './Editprofile';
 import Requestwork from './Requestwork';


const App = () => {
  return (
    <div>


    
       <BrowserRouter>
       <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
       <Route path="/register" exact component={Register}/>
       <Route path="/dashboard" exact component={Dashboard}/>
       <Route path="/myprofile" exact component={Myprofile}/>
        <Route path="/viewprofile/:name/:email/:skill/:id" exact component={Viewprofile}/>
        <Route path="/test" exact component={Test}/>
        <Route path="/editprofile" exact component={Editprofile}/>
        <Route path="/mywork" exact component={Mywork}/>
        <Route path="/requestwork" exact component={Requestwork}/>
    

       </Switch>
       </BrowserRouter> 
    
    </div>
  )

}

export default App

