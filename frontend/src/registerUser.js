import React from "react";
import ReactDOM from "react";

import login from "./images/login.svg";
import drawing from "./images/drawing.svg";
import styles from "./css/login.css";
import Register from "./register"


class RegisterUser extends React.Component{
    render(){
        return(
        <div className="OuterContainer">
                <div className="imgs">
                    <img className="image-login" src={login}/>
                </div>
            <div className="limiter">
            <div className="container-login">
            <div className="wrap-login">
               <Register/>
                <div className="login100-more">
                </div>
            </div>
         </div>
         </div>

    
            </div>
            

        );
    }
}

export default RegisterUser;