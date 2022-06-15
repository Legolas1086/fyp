import React, { useEffect, useState } from "react";
import Nav from "./nav";
import styles from "./css/chat.css"
import axios from "axios";
import { useLocation } from "react-router-dom";

class Chat extends React.Component{
    state={
        islogged:"",
        senderid:"",
        sender:"legolas",
        messages:[],
    }

    fetchData(){
        axios.get("http://127.0.0.1:8000/chats/",{params:{user1:this.state.islogged,user2:2}})
            .then((response) => response.data)
            .then((res)=>{console.log(res[0]);return res})
            .then((res) => {this.setState({messages:res})})
        .then(console.log(this.state.messages))
    }
    
    componentDidMount(){
        const loggedid = localStorage.getItem('id')
        this.setState({islogged:loggedid})
        console.log(this.state.islogged)
        //setSenderid(location.state.senderid)
        setInterval(() => {
            this.fetchData(); 
        }, 5000);
        
        
    }


   
    

    render(){

        return(
            <div className="chat-outer">
                <Nav/>
                <div className="chat-body">
                    <div className="chat-box" style={{marginLeft:"35rem", border:"3px",borderStyle:"solid",marginTop:"10rem",width:"50rem",height:"40rem",borderRadius:"10px"}}>
                        <div className="sender-box">
                            <h2>legolas</h2>
                        </div>
                        <div className="chat-history" style={{height:"30rem"}}>
                            {this.state.messages.map((chat)=>
                            <div>
                                <p>{chat.timestamp}</p>
                                <h1>{chat.message}</h1>           


                            </div>
                            )}
                        </div>
                        <div className="send-container">
                            <form className="message">
                                <input className="message-input" type="text"/>
                                <button className="send" type="submit">send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;