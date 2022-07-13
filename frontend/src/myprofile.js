import axios from "axios";
import React from "react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { Navigate } from "react-router";
import Nav from "./nav"

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
                <div>
                    <div className="profile">
                        <h1>{this.state.profile.username}</h1>
                        <h1>{this.state.profile.email}</h1>
                        <h1>{this.state.profile.branch}</h1>
                        <h1>{this.state.profile.interests}</h1>
                        
                    </div>
                    
                    <div className="wishlist">
                        {this.state.wishlist.map((book)=>
                        <div>
                            <h1>{book.bookname}</h1>
                        </div>
                        )}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile;