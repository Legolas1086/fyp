import axios from "axios";
import React from "react";
import { Navigate } from "react-router";
import Nav from "./nav";
import styles from './css/profile.css'

class MyProfile extends React.Component{
    state = {
        logged:0,
        profile:{},
        wishlist:[]
    }


    componentWillMount(){
        this.setState({logged:localStorage.getItem('id')})
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/profile/?id=".concat(this.state.logged))
        .then(res=>res.data)
        .then(res=>this.setState({profile:res[0]}))

        axios.get("http://127.0.0.1:8000/getwish/?id=".concat(localStorage.getItem('id')))
        .then(res=>res.data)
        .then(res=>console.log(res))       
    }


    render(){
        if(localStorage.getItem('id')==0){
            return(
                <Navigate to="/login"/>
            )
        }
        return(
            <div className="profile-outer">
                <Nav/>
                <div className="profile-body">
                    <div className="user-details">
                        <h2>{this.state.profile.username}</h2>
                        <h2>{this.state.profile.email}</h2>
                        <h2>{this.state.profile.branch}</h2>
                        <h2>{this.state.profile.interests}</h2>
                    </div>
                    
                    <div className="user-wishlist">

                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile;