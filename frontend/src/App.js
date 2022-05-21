import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Switch,Route } from 'react-router-dom'
import Credential from './cred';
import Dashboard from './dashboard.js';

function App() {
  return (
    <Router>
    <div>
        <div className="Content">
          <Routes>
            <Route exact path="/" element={<Credential/>} />
            <Route exact path="/dash" element={<Dashboard/>}/>
          </Routes>
         
          
        </div>
      
      </div>
  </Router>
    
  );
}

export default App;
