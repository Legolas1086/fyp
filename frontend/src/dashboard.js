import React, { useEffect, useState } from "react";
import { ReactDOM} from "react";
import Nav from "./nav.js";
import styles from './css/dash.css';
import { Link,Navigate } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";
import axios from "axios";



class Dashboard extends React.Component{
    state = {
        isloading:true,
        data:[],
        islogged:0,
        issearching:false,
    }
    

    
    
    componentDidMount(){
        const loggedid = localStorage.getItem('id')
        this.setState({ islogged: loggedid }, () => {
            this.fetchData();
          }); 
        
       
    }

    fetchData(){
        if(this.state.issearching){

        }
        else{
            console.log(this.state.islogged);
                axios.get("http://127.0.0.1:8000/books/",{params:{'id':this.state.islogged}})
                .then((response) => response.data)
                .then((res) => {console.log(res[0].bookname);
                        return res})
                .then((res) => {this.setState({data:res})})
                .then(this.setState({isloading:false}))
        }
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
                <form className="search-form">
                    <input className="input1" type="text" placeholder="search"/>
                    <button type="submit">search</button>
                </form>
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