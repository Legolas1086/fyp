import React from "react";
import ReactDOM from "react";

import login from "./images/login.svg";
import drawing from "./images/drawing.svg";
import styles from "./css/login.css";
import Login from "./login.js"
import { useNavigate } from "react-router-dom";


const Credential=()=>{
        let navigation = useNavigate()
        return(
        <div className="OuterContainer">
                <div className="imgs">
                    <img className="image-login" src={login}/>
                </div>
            <div className="limiter">
            <div className="container-login">
            <div className="wrap-login">
               <Login navigation={navigation}/>
                <div className="login100-more">
                </div>
            </div>
         </div>
         </div>

    
            </div>
            

        );
    
}

export default Credential;