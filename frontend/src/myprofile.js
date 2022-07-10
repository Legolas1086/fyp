import React from "react";
import { Navigate } from "react-router";
import Nav from "./nav"

class MyProfile extends React.Component{
    render(){
        if(localStorage.getItem('id')==0){
            return(
                <Navigate to="/login"/>
            )
        }
        return(
            <div>
                <Nav/>
                <div>
                    <h1>hello</h1>
                </div>
            </div>
        )
    }
}

export default MyProfile;