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
               <Register/>
               </div>
            

        );
    }
}

export default RegisterUser;