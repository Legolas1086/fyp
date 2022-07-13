import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import avatar from "./images/avatar.svg";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import Nav from "./nav";
import {AuthContext} from "./context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import {Form,Button} from 'react-bootstrap';
import { faListSquares } from "@fortawesome/free-solid-svg-icons";

function Login (){
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessgae,setErrorMessage] = useState(false)
    
    function onEmailChange(event){
        setEmail(event.target.value)
    }
    function onPasswordChange(event){
        setPassword(event.target.value)
    }

    
   

    function handleSubmit(event){    

        event.preventDefault();
        let auth = false;
        const {id,login,logout} = context
        console.log(password)
        let url = "http://127.0.0.1:8000/authenticate"
        axios.get(url,{params:{'email':email,'pass':password}})
        .then(res=>res.data)
        .then(res=>{
            login(res)
            setErrorMessage(false)
            console.log(res)
            localStorage.setItem('id',res)
            window.setTimeout(() => {
                navigate("/")
            }, 3000)
        })
        .catch(error=>{
            setErrorMessage(true)
        })


        
        

        
        
    }

    

    
     return(
             <Form onSubmit={handleSubmit}>
             <div className="avatar">
                    <img width="60" src={avatar}/>
             </div>
             {errorMessgae?<div>
                <h5 style={{color:"red"}}>Can't find user. Please ensure that the email and password are correct.</h5>
             </div>:<div></div>}
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={onEmailChange}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={onPasswordChange} />
  </Form.Group>
                    
                    <div className="container-login100-form-btn register-but">
                        <Link to="/" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} name = "dashboard">
                        <button type="submit" className="login100-form-btn" onClick={handleSubmit}>
                            Login
                            
                        </button>
                        </Link>
                    </div>

                    <div className="text-center p-t-46 p-b-20">
                        <span className="txt2">
                            Haven't registered with us ?
                        </span>
                    </div>
    
                    <div className="container-login100-form-btn register-but">
                        <Link to="/register" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} >
                        <button  className="login100-form-btn">
                            Register
                        </button>
                        </Link>
                    </div>
</Form>
     );
    
}

//Login.contextType = AuthContext;
export default Login;