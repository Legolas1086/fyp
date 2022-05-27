import React, { useEffect, useState } from "react";
import { ReactDOM} from "react";
import Nav from "./nav.js";
import styles from './css/dash.css';
import { Link,Navigate } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";



class Dashboard extends React.Component{
    state = {
        isloading:true,
        data:[]
    }
    

    
    
    componentDidMount(){
        fetch("http://127.0.0.1:8000/books/")
        .then((response) => response.json())
        .then((res) => {console.log(res[5].bookname);
                        return res})
        .then((res) => {this.setState({data:res})})
        .then(this.setState({isloading:false}))
    }


    

    render(){
        return(
            <div>
            
            <div className="dashboard-outer">
                <Nav/>
                <div className="dash-body">
                {this.state.isloading?<h1>Please wait ...</h1>:
                   this.state.data.map((book)=>
                
                   <div className="content-card">
                        <Link to="/details" state={{idDetails:book.isbn}}>
                           <img id = {book.id} src={"http://127.0.0.1:8000".concat(book.image)} style={{width:"250px",height:"300px"}}></img>
                           <h3>{book.bookname}</h3>
                        </Link>
                       
                    

                   </div>
               
                    )
                }
                
                </div>
            </div>
            
            </div>
        
        
        );
    }
    
}

export default Dashboard;