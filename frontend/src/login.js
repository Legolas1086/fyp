import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import avatar from "./images/avatar.svg";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import Nav from "./nav";

class Login extends React.Component{
    
    state={
            password:"g",
            email:"",
        }
    
        onChange=(event)=>{
            this.setState({[event.target.name]:event.target.value})
        }

    handleSubmit = (event)=>{    
        console.log(this.state.password)
        let url = "http://127.0.0.1:8000/authenticate"
        axios.get(url,{params:{'email':this.state.email,'pass':this.state.password}})
        .then(res=>res.data)
        .then(res=>{
            localStorage.setItem('id',res)})
    }

    componentDidMount(){
        fetch("http://127.0.0.1:8000/users/")
        .then(res=>(res.json()))
        .then(data=>{this.setState({username:data[0].username})
        console.log(this.state.username)})
       
    }

    render(){
     return(
             <form className="login100-form validate-form" onSubmit={this.handleSubmit}>      
                    <div className="avatar">
                        <img width="60" src={avatar}/>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                        <input className="input100" autoComplete="off" type="text" name="email" onChange={this.onChange}></input>
                        <span className="focus-input100"></span>
                        <span className="label-input100">Email</span>
                    </div>
                    
                    
                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <input className="input100" type="password" name="password" onChange={this.onChange}></input>
                        <span className="focus-input100"></span>
                        <span className="label-input100">Password</span>
                    </div>

                    

                    <div className="flex-sb-m w-full p-t-3 p-b-32">

                        <div className="forgot-password">
                            <a href="#" className="txt1">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
            

                    <div className="container-login100-form-btn">
                        <Link to="/" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} name = "dashboard">
                        <button type="submit" className="login100-form-btn" onClick={this.handleSubmit}>
                            Login
                            
                        </button>
                        </Link>
                    </div>

                    <div className="text-center p-t-46 p-b-20">
                        <span className="txt2">
                            haven't registered with us ?
                        </span>
                    </div>
    
                    <div className="container-login100-form-btn">
                        <Link to="/register" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} >
                        <button  className="login100-form-btn">
                            Register
                        </button>
                        </Link>
                    </div>       
                </form>
     );
    }
}

export default Login;