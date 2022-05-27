import React, { useEffect, useState } from "react";
import { ReactDOM} from "react";
import Nav from "./nav.js";
import styles from './css/dash.css';
import { Link,Navigate } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";



const Dashboard =(props)=>{
    const[isloading,setLoading] = useState(true);
    const[data,setData] = useState([]);
    const[loggedin,setLoggedin] = useState(false);
    

    
    
    useEffect(()=>{
        console.log(props)
        //setLoggedin({loggedin:this.props.props.loggedin})
        console.log(loggedin)
        fetch("http://127.0.0.1:8000/books/")
        .then((response) => response.json())
        .then((res) => {console.log(res[5].bookname);
                        return res})
        .then((res) => {setData(res)})
        .then(setLoading(false))
    },[isloading,data,loggedin]);


    

    
        return(
            <div>
            
            <div className="dashboard-outer">
                <Nav/>
                <div className="dash-body">
                {isloading?<h1>Please wait ...</h1>:
                   data.map((book)=>
                
                   <div className="content-card">
                        <Link to="/details" state={{idDetails:book.isbn}}>
                           <img id = {book.id}src={bookimage}></img>
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

export default Dashboard;