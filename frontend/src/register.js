import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import avatar from "./images/avatar.svg";
import axios from 'axios';


class Register extends React.Component{
    
    state={
            username:"",
            email:"",
            password:"",
            branch:"",
            interests:""
        }

    onChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    
    handleSubmit = (event)=>{  
        let data = new FormData()
        data.append('username',this.state.username)
        data.append('email',this.state.email)
        data.append('password',this.state.password)
        data.append('branch',this.state.branch)
        data.append('interests',this.state.interests)
        console.log(data)


        let url = 'http://127.0.0.1:8000/register/';
        axios.post(url, data,{
            headers: {
                'content-type': 'multipart/form-data',
            }
          })
              .then(res => {
                console.log(res.data);
              })
              .catch(err => console.log(err))
        
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
                    
                    
                    <div className="wrap-input100 validate-input" data-validate="Username is required">
                        <input className="input100" type="text" name="username" onChange={this.onChange}></input>
                        <span className="focus-input100"></span>
                        <span className="label-input100">Username</span>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Branch is required">
                        <input className="input100" type="text" name="branch" onChange={this.onChange}></input>
                        <span className="focus-input100"></span>
                        <span className="label-input100">Branch</span>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Interests is required">
                        <input className="input100" type="text" name="interests" onChange={this.onChange}></input>
                        <span className="focus-input100"></span>
                        <span className="label-input100">Interests</span>
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
                           <button type = "submit" className="login100-form-btn" onClick={this.handleSubmit}>
                            Register   
                           </button>
                        </Link>
                    </div>

                    <div className="text-center p-t-46 p-b-20">
                        <span className="txt2">
                            already have an account?
                        </span>
                    </div>
    
                    <div className="container-login100-form-btn">
                        <Link to="/login" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} name = "login">
                        <button className="login100-form-btn">
                            Login
                        </button>
                        </Link>
                    </div>       
                </form>
     );
    }
}

export default Register;