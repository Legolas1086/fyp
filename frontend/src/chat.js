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
        inputMessage:"",
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
        this.fetchData(); 
        setInterval(() => {
            this.fetchData(); 
        }, 1000);
             
    }

    handleChange=(event)=>{
        this.setState({inputMessage:event.target.value})
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        let data = new FormData();
        data.append('sender',this.state.islogged)
        data.append('receiver',2)
        data.append('message',this.state.inputMessage)

        let url = "http://127.0.0.1:8000/postchat/";
        axios.post(url,data,{
            headers: {
                'content-type': 'multipart/form-data',
            }
          }).then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err))
        this.setState({inputMessage:""})
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
                            
                            
                            <div className="chat-message" style={{marginLeft:chat.sender==this.state.islogged?"25rem":"1rem",backgroundColor:chat.sender==this.state.islogged?"blue":"gray"}}>
                                <p className="chat-message-timestamp">{chat.timestamp}</p>
                                <p className="chat-message-message">{chat.message}</p>
                                           
                            </div>
                           
                            
                            )}
                        </div>
                        <div className="send-container">
                            <form className="message" onSubmit={this.handleSubmit}>
                                <input className="message-input" type="text" placeholder="message" onChange={this.handleChange} value={this.state.inputMessage}/>
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