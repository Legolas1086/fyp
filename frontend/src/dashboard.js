import React, { useEffect, useState } from "react";
import { ReactDOM} from "react";
import Nav from "./nav.js";
import styles from './css/dash.css';
import { Link,Navigate } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";
import axios from "axios";
import {AuthContext} from "./context"



class Dashboard extends React.Component{
    static contextType = AuthContext;
    state = {
        isloading:true,
        data:[],
        islogged:0,
        input:"",
    }
    

    
    async fetchData  (url,data){
        
        console.log(url);
            axios.get(url,{params:data})
            .then((response) => response.data)
            .then((res) => {console.log(res[0].bookname);
                    return res})
            .then((res) => {this.setState({data:res})})
            .then(this.setState({isloading:false}))
        
    }

    componentWillMount(){
        console.log(this.context)
        const loggedid = localStorage.getItem('id')
        this.setState({ islogged: loggedid }, () => {
            this.fetchData("http://127.0.0.1:8000/books/",{'id':this.state.islogged});
          }); 
        
       
    }

    handleChange=(event)=>{
        console.log(this.context)
        this.setState({input:event.target.value})
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        this.fetchData("http://127.0.0.1:8000/searchbook/",{'search':this.state.input,'id':this.state.islogged});
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
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <input className="input1" type="text" placeholder="search" onChange={this.handleChange}/>
                    <button type="submit">search</button>
                </form>
                <div className="dash-body">

                   {this.state.data.map((book)=>
                
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