import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Switch,Route } from 'react-router-dom'
import Credential from './cred';
import Dashboard from './dashboard.js';
import Details from './details';
import React from 'react';
import Nav from './nav';
import Post from './post.js';
import RegisterUser from './registerUser.js';
import MyBooks from './mybooks';
import EditBook from './editbook';
import Chat from './chat';
import Footer from './footer';
import MyProfile from './myprofile';

class App extends React.Component {
  state={
    loggedin:true
  }

  callBack(loginData){
    this.setState({loggedin:loginData})
    console.log(this.state.loggedin)
  }
  

  render(){
    return (
      
      <Router>
        <div>
          <div className="Content">
          
            <Routes>
              
              <Route exact path="/login" element={<Credential checkLogin={this.callBack}/>} />
              <Route exact path="/register" element={<RegisterUser/>}/>
              <Route exact path="/" element={<Dashboard props={{loggedin:this.state.loggedin}}/>}/>
              <Route exact path="/details" element={<Details props={{loggedin:this.state.loggedin}}/>}/>
              <Route exact path="/post" element={<Post props={{loggedin:this.state.loggedin}}/>}/>
              <Route exact path="/mybooks" element={<MyBooks props={{loggedin:this.state.loggedin}}/>}/>
              <Route exact path="/editbook" element={<EditBook props={{loggedin:this.state.loggedin}}/>}/>
              <Route exact path="/chat" element={<Chat props={{loggedin:this.state.loggedin}}/>}/>
              <Route exact path="/myprofile" element={<MyProfile/>}/>
              
            </Routes>
            
          </div>
          {window.location.pathname != '/login' && window.location.pathname!='/register'?<Footer/>:<div>dummy</div>}
        </div>
    </Router>
    
    
    );
  }
}

export default App;
