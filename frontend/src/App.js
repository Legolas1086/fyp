import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Switch,Route } from 'react-router-dom'
import Credential from './cred';
import Dashboard from './dashboard.js';
import Details from './details';
import React from 'react';
import Nav from './nav';

class App extends React.Component {
  state={
    logged:false
  }

  render(){
    return (

      <Router>
        <div>
         
          <div className="Content">
          
            <Routes>
              <Route exact path="/login" element={<Credential/>} />
              <Route exact path="/" element={<Dashboard/>}/>
              <Route exact path="/details" element={<Details/>}/>
            </Routes>
          </div>
        </div>
    </Router>
    
    );
  }
}

export default App;
