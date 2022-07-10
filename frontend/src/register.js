import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import avatar from "./images/avatar.svg";
import axios from 'axios';
import {Form,Button} from 'react-bootstrap';

class Register extends React.Component{
    
    state={
            username:"",
            email:"",
            password:"",
            branch:"",
            interests:"",
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
             // <form className="login100-form validate-form" onSubmit={this.handleSubmit}>      
             //        <div className="avatar">
             //            <img width="60" src={avatar}/>
             //        </div>

             //        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
             //            <input className="input100" autoComplete="off" type="text" name="email" onChange={this.onChange}></input>
             //            <span className="focus-input100"></span>
             //            <span className="label-input100">Email</span>
             //        </div>
                    
                    
             //        <div className="wrap-input100 validate-input" data-validate="Username is required">
             //            <input className="input100" type="text" name="username" onChange={this.onChange}></input>
             //            <span className="focus-input100"></span>
             //            <span className="label-input100">Username</span>
             //        </div>

             //        <div className="wrap-input100 validate-input" data-validate="Branch is required">
             //            <input className="input100" type="text" name="branch" onChange={this.onChange}></input>
             //            <span className="focus-input100"></span>
             //            <span className="label-input100">Branch</span>
             //        </div>

             //        <div className="wrap-input100 validate-input" data-validate="Interests is required">
             //            <input className="input100" type="text" name="interests" onChange={this.onChange}></input>
             //            <span className="focus-input100"></span>
             //            <span className="label-input100">Interests</span>
             //        </div>

             //        <div className="wrap-input100 validate-input" data-validate="Password is required">
             //            <input className="input100" type="password" name="password" onChange={this.onChange}></input>
             //            <span className="focus-input100"></span>
             //            <span className="label-input100">Password</span>
             //        </div>
            

             //        <div className="container-login100-form-btn">
             //            <Link to="/" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} name = "dashboard">
             //               <button type = "submit" className="login100-form-btn" onClick={this.handleSubmit}>
             //                Register   
             //               </button>
             //            </Link>
             //        </div>

             //        <div className="text-center p-t-46 p-b-20">
             //            <span className="txt2">
             //                Already have an account?
             //            </span>
             //        </div>
    
             //        <div className="container-login100-form-btn">
             //            <Link to="/login" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} name = "login">
             //            <button className="login100-form-btn">
             //                Login
             //            </button>
             //            </Link>
             //        </div>       
             //    </form>
                <Form onSubmit={this.handleSubmit}>
             <div className="avatar">
                    <img width="60" src={avatar}/>
             </div>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={this.onChange} name="email"/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter Username" onChange={this.onChange}  name="username"/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Branch</Form.Label>
    <Form.Control type="text" placeholder="Enter Branch" onChange={this.onChange} name="branch"/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Interests</Form.Label>
    <Form.Control type="text" placeholder="Enter Interests" onChange={this.onChange} name="interests"/>
    <Form.Text className="text-muted">
      What would you like to read?.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={this.onChange} name="password"/>
  </Form.Group>
                                        <div className="container-login100-form-btn register-but">
                        <Link to="/" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} name = "dashboard">
                           <button type = "submit" className="login100-form-btn" onClick={this.handleSubmit}>
                            Register   
                           </button>
                        </Link>
                    </div>

                    <div className="text-center p-t-46 p-b-20">
                        <span className="txt2">
                            Already have an account?
                        </span>
                    </div>
    
                    <div className="container-login100-form-btn register-but">
                        <Link to="/login" style={{textDecoration:'none',color:"white",fontFamily:"sans-serif"}} name = "login">
                        <button className="login100-form-btn">
                            Login
                        </button>
                        </Link>
                    </div>
</Form>
     );
    }
}

export default Register;