import React from "react";
import { ReactDOM } from "react";
import avatar from "./images/avatar.svg";


class Login extends React.Component{
    handleSubmit = (event)=>{
        console.log(event.target[0].value);
        console.log(event.target[1].value);
    }
    render(){
     return(
             <form className="login100-form validate-form" onSubmit={this.handleSubmit}>      
                    <div className="avatar">
                        <img width="60" src={avatar}/>
                    </div>

                    <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                        <input className="input100" autoComplete="off" type="text" name="email"></input>
                        <span className="focus-input100"></span>
                        <span className="label-input100">Email</span>
                    </div>
                    
                    
                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <input className="input100" type="password" name="password"></input>
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
                        <button className="login100-form-btn">
                            Login
                        </button>
                    </div>

                    <div className="text-center p-t-46 p-b-20">
                        <span className="txt2">
                            haven't registered with us ?
                        </span>
                    </div>
    
                    <div className="container-login100-form-btn">
                        <button type="submit" className="login100-form-btn">
                            Register
                        </button>
                    </div>       
                </form>
     );
    }
}

export default Login;