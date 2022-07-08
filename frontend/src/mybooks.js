import React, { useEffect, useState } from "react";
import { ReactDOM} from "react";
import Nav from "./nav.js";
import styles from './css/mybooks.css';
import { Link,Navigate } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";
import axios from "axios";



class MyBooks extends React.Component{
    state = {
        isloading:true,
        data:[],
        islogged:0
    }
    

    
    
    componentDidMount(){
        const loggedid = localStorage.getItem('id')
        this.setState({ islogged: loggedid }, () => {
            console.log(this.state.islogged);
            axios.get("http://127.0.0.1:8000/mybooks/",{params:{'sellerid':this.state.islogged}})
            .then((response) => response.data)
            .then((res) => {console.log(res[0].bookname);
                        return res})
            .then((res) => {this.setState({data:res})})
            .then(this.setState({isloading:false}))
          }); 
        
       
    }


    

    render(){
        if(this.state.loggedid==0){
            return(
                <Navigate to="/login"/>
            )
        }
        return(
            <div>
            
            <div className="dashboard-outer">
                <Nav/>
                <div style={{minHeight:"89vh"}}>
                <div className="dash-body" style={{marginTop:"5rem"}}>
                {this.state.isloading?<h1>Please wait ...</h1>:
                   this.state.data.map((book)=>
                
                   <div className="content-card">
                        <Link to="/editbook" state={{editid:book.isbn}}>
                           <img id = {book.id} src={"http://127.0.0.1:8000".concat(book.image)} style={{width:"200px",height:"240px",paddingBottom:"0.5rem"}}></img>
                           <p style={{width:"200px",color:"000",fontWeight:"600"}}>{book.bookname}</p>
                    
                        </Link>
                       
                    

                   </div>
               
                    )
                }
                
                </div>
                </div>
            </div>
            
            </div>
            
        
        
        );
            
           
            
    }
    
}

export default MyBooks;