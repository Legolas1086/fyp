import React from "react";
import { ReactDOM } from "react";


 function Login(){
     return(
         <div>
             <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                        <input className="input100" autocomplete="off" type="text" name="email"></input>
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
                        <button onclick="window.location.href='/register' " className="login100-form-btn">
                            Register
                        </button>
                    </div>
         </div>
     )
}

export default Login;