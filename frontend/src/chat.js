import React, { useEffect, useState } from "react";
import Nav from "./nav";
import styles from "./css/chat.css"
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";

class Chat extends React.Component{
    state={
        islogged:"",
        senderid:0,
        sender:"",
        senders:[],
        messages:[],
        inputMessage:"",
    }

    fetchMessages(){
        if(this.state.senderid!=0){
            axios.get("http://127.0.0.1:8000/chats/",{params:{user1:this.state.islogged,user2:this.state.senderid}})
                .then((response) => response.data)
                .then((res)=>{console.log(res[0]);return res})
                .then((res) => {this.setState({messages:res})})
            .then(console.log(this.state.messages))
        }
    }

    fetchSenders(){
        axios.get("http://127.0.0.1:8000/getuserschat/",{params:{'id':this.state.islogged}})
        .then((response)=>response.data)
        .then((res)=>{console.log(res[0]);return res})
        .then((res) => {this.setState({senders:res})})
        .then(console.log(this.state.senders))
    }
    
    componentWillMount(){
        axios.get("http://127.0.0.1:8000/publickey/?id=1")
        .then(res=>res.data)
        .then(res=>console.log(res))
        const loggedid = localStorage.getItem('id')
        this.setState({islogged:loggedid})
        if(localStorage.getItem('senderid')!=0){
            this.setState({senderid:localStorage.getItem('senderid')})
        }
        
        console.log(this.state.islogged)
        this.fetchMessages(); 
        
        setInterval(() => {
            this.fetchSenders();
            this.fetchMessages(); 
        }, 3000);
        localStorage.setItem('senderid',0)   
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

    handleSenderClick = (id,username) =>{
        this.setState({senderid:id,sender:username})
        console.log(id)
    }

    componentWillUnmount(){
        localStorage.setItem('senderid',0)
    }

   
    

    render(){
        if(localStorage.getItem('id')==0){
            return(
                <Navigate to="/login"/>
            )
        }

        return(
            <div className="chat-outer">
                <Nav/>
                <div className="MyBooks-container">
                <div className="chat-body" >
                    
                    <div className="chat-box">
                        <div className="chat-left">
                            <div className="user-search">
                                <form className="user-search-form">
                                    <input type="text"/>
                                </form>
                            </div>
                            <div className="user-list">
                                {this.state.senders.map((sender)=>
                                    <button onClick={()=>this.handleSenderClick(sender.id,sender.username)}>
                                    <h3 >{sender.username}</h3>
                                    </button>
                                )}     
                            </div>
                        </div>
                        <div className="chat-right" style={{marginTop:"0"}}>
                            <div className="sender-box" style={{marginTop:"0"}}>
                                <h2>{this.state.sender}</h2>
                            </div>
                            <div className="chat-history">
                                {this.state.messages.map((chat)=>
                            
                                <div className="chat-message-cont" style={{justifyContent:chat.sender==this.state.islogged?"end":"start"}}>
                                <div className="chat-message" className={chat.sender==this.state.islogged?"right-chat":"left-chat"}>
                                    <p className="chat-message-timestamp">{chat.timestamp.slice(0,19)}</p>
                                    <p className="chat-message-message">{chat.message}</p>
                                           
                                </div>
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
                    </div>
            </div>
        )
    }
}

export default Chat;