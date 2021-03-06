import React from 'react'
import { Link, useLinkClickHandler } from 'react-router-dom';
import styles from './css/nav.css'


function Nav(){
    return(
        <nav className="Nav_bar">
            <h1>Pustak Bandaar</h1>
            <div className='nav-links' tabIndex="1">
               <span><Link to="/" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}}>Dashboard</Link></span>
               <span><Link to="/post" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}}>sell</Link></span>
               <span><Link to="/mybooks" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}}>MyBooks</Link></span>
               <span><Link to="/chat" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}}>Chat</Link></span>
               <span><Link to="/login" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} onClick={()=>localStorage.setItem('id',0)}>Logout</Link></span>
               <span><Link to="/myprofile" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}}>MyProfile</Link></span>
            </div>
        </nav>
    )
}

export default Nav;