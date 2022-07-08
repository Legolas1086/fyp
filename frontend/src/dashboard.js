import React, { useEffect, useState } from "react";
import { ReactDOM} from "react";
import Nav from "./nav.js";
import styles from './css/dash.css';
import { Link,Navigate } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";
import axios from "axios";
import DonorHomePage from "./card.js";
import {Form ,FormControl,Button } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';


class Dashboard extends React.Component{
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
        const loggedid = localStorage.getItem('id')
        this.setState({ islogged: loggedid }, () => {
            this.fetchData("http://127.0.0.1:8000/books/",{'id':this.state.islogged});
          }); 
        
       
    }

    handleChange=(event)=>{
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
                <div style={{minHeight:"89vh"}}>
                <form className="search-bar" onSubmit={this.handleSubmit}>
                <Form.Control type="text" placeholder="Search for books" onChange={this.handleChange} className="search-bar-input"/>
                    <Button variant="primary" type="submit">Search</Button>
                </form>
                      <div className="dash-body">

                   {this.state.data.map((book)=>
                
                   <div className="content-card">
                   <div style={{padding:"1 1.5rem", color:"#000"}}>
                        <Link to="/details" state={{idDetails:book.isbn}}>
                           <img id = {book.id} src={"http://127.0.0.1:8000".concat(book.image)} style={{width:"200px",height:"240px",paddingBottom:"0.5rem"}} className='card-image'></img>
                           <p style={{width:"200px",color:"000",fontWeight:"600"}}>{book.bookname}</p>
                        </Link>
                        <div style={{color:"#000", fontWeight:"600"}}>&#x20A8; {book.cost}</div>
                    </div>
                       
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

export default Dashboard;