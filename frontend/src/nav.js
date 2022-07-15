import React from 'react'
import styles from './css/nav.css';
import {useLocation} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useLinkClickHandler } from 'react-router-dom';



function Nav(){
    const {pathname} = useLocation();
    return(
        <nav className="Nav_bar">
            <h1>Pustak Bandaar</h1>
            <div className='nav-links' tabIndex="1">
               {pathname === '/' ? <span style={{background:"#1266f1",padding:"1rem",borderRadius:"10px"}}><Link to="/" className="nav-button" style={{color:"#005073"}}>Dashboard</Link></span>:<span style={{padding:"1rem",borderRadius:"10px"}}><Link to="/" className="nav-button">Dashboard</Link></span>}
               {pathname === '/post' ? <span style={{background:"#1266f1",padding:"1rem",borderRadius:"10px"}}><Link to="/post" className="nav-button">Post <FontAwesomeIcon icon={faSquarePlus} /></Link></span>:<span style={{padding:"1rem",borderRadius:"10px"}}><Link to="/post" className="nav-button">Post <FontAwesomeIcon icon={faSquarePlus} /></Link></span>}
               {pathname === '/mybooks' ? <span style={{background:"#1266f1",padding:"1rem",borderRadius:"10px"}}><Link to="/mybooks" className="nav-button">MyBooks</Link></span>:<span style={{padding:"1rem",borderRadius:"10px"}}><Link to="/mybooks" className="nav-button">MyBooks</Link></span>}
               {pathname === '/chat' ? <span style={{background:"#1266f1",padding:"1rem",borderRadius:"10px"}}><Link to="/chat" className="nav-button">Messages</Link></span>:<span style={{padding:"1rem",borderRadius:"10px"}}><Link to="/chat" className="nav-button">Messages</Link></span>}
               {pathname === '/myprofile' ? <span style={{background:"#1266f1",padding:"1rem",borderRadius:"10px"}}><Link to="/myprofile" className="nav-button">MyProfile</Link></span>:<span style={{padding:"1rem",borderRadius:"10px"}}><Link to="/myprofile" className="nav-button">MyProfile</Link></span>}
               {pathname === '/guide' ? <span style={{background:"#1266f1",padding:"1rem",borderRadius:"10px"}}><Link to="/guide" className="nav-button">Guide</Link></span>:<span style={{padding:"1rem",borderRadius:"10px"}}><Link to="/guide" className="nav-button">Guide</Link></span>}
               {pathname === '/login' ? <span style={{background:"#1266f1",padding:"1rem",borderRadius:"10px"}}><Link to="/login" className="nav-button" onClick={()=>localStorage.setItem('id',0)}>Logout</Link></span>:<span style={{padding:"1rem",borderRadius:"10px"}}><Link to="/login" className="nav-button" onClick={()=>localStorage.setItem('id',0)}>Logout</Link></span>}
               
               
            </div>
        </nav>
    )
}

export default Nav;