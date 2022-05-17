import React from "react";
import ReactDOM from "react";
import avatar from "./images/avatar.svg";
import login from "./images/login.svg";
import drawing from "./images/drawing.svg";
import styles from "./css/login.css";
import Login from "./login.js"


class Credential extends React.Component{
    render(){
        return(
        <div className="OuterContainer">
                <div className="imgs">
                    <img className="image-login" src={login}/>
                </div>
            <div className="limiter">
            <div className="container-login">
            <div className="wrap-login">
                <form method="POST" action ='/login' className="login100-form validate-form">
                    
                

                    <div className="avatar">
                        <img width="60" src={avatar}/>
                    </div>

                    <Login/>
                    
                    
                    
                </form>

                <div className="login100-more">
                </div>
            </div>
         </div>
         </div>

    
            </div>
            

        );
    }
}

export default Credential;