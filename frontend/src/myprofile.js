import axios from "axios";
import React from "react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { Navigate } from "react-router";
import Nav from "./nav";
import styles from './css/profile.css';
import avatar from "./images/avatar.svg";
import { Link} from "react-router-dom";

class MyProfile extends React.Component{
    state={
        loggedin:0,
        profile:{},
        wishlist:[],
    }

    componentDidMount(){
        let wish
        this.setState({loggedin:localStorage.getItem('id')})
        axios.get("http://127.0.0.1:8000/getwish/?id=".concat(localStorage.getItem('id')))
        .then(res=>res.data)
        .then(res=>wish=res)
        
        axios.get("http://127.0.0.1:8000/profile/?id=".concat(localStorage.getItem('id')))
        .then(res=>res.data)
        .then(res=>this.setState({profile:res[0],wishlist:wish}))
        
    }


    render(){
        if(localStorage.getItem('id')===0){
            return(
                <Navigate to="/login"/>
            )
        }
        return(
            <div>
                <Nav/>
                <div className="details-body-top-pro" style={{minHeight:"89vh"}}>
                <div className="container-profile">
                    <div className="profile">
                    <div className="avatar">
                    <img width="60" src={avatar}/>
                    </div>
                        <p>Name: {this.state.profile.username}</p>
                        <p>Email: {this.state.profile.email}</p>
                        <p>Branch: {this.state.profile.branch}</p>
                        <p>Interests: {this.state.profile.interests}</p>
                        
                    </div>
                    
                    <div className="wishlist">
                    <h1 style={{textAlign:"center"}}>Wishlist</h1>

                    <div className="wishlist-card">
                        
                        {this.state.wishlist.map((book)=>
                   <div className="content-card">
                   <div style={{padding:"1 1.5rem", color:"#000"}}>
                        <Link to="/details" state={{idDetails:book.isbn}}>
                           <img id = {book.id} src={"http://127.0.0.1:8000".concat(book.image)} style={{width:"200px",height:"240px",paddingBottom:"0.5rem"}} className='card-image'></img>
                           <p style={{width:"200px",color:"000",fontWeight:"600"}}>{book.bookname}</p>
                        </Link>
                        <div style={{color:"#000", fontWeight:"600"}}>&#x20A8; {book.cost}</div>
                    </div>
                       
                    </div>
                        )}
                        </div>
                        
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile;