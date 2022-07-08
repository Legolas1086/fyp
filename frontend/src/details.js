import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import Nav from "./nav.js";
import { useLocation } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";
import styles from "./css/details.css"
import { Link } from "react-router-dom";
import { FaComment } from 'react-icons/fa';
import {Form ,FormControl,Button } from 'react-bootstrap';



const Details=(props)=>{
    const [state,setState] = useState("1")
    const [data,setData] = useState({})

    const [similarbook,setSimilarBook]=useState([{}])

    
    const location = useLocation()
    
    useEffect(()=>{
        setState(location.state.idDetails)
        console.log(state)
        fetch("http://127.0.0.1:8000/bookdetails/?id=".concat(state))

        .then(res=>(res.json()))
        .then(res=>setData(res[0]))
    },[location,state,data]);

        useEffect(()=>{
        fetch("http://127.0.0.1:8000/similarbooks/")
        .then(res=>(res.json()))
        .then(res=>setSimilarBook(res))
    },[]);

similarbook.map(siri=>console.log(siri))

    
        return(
            <>
            <div className="details-outer">
                <Nav/>
              <div className="details-body-top" >
              <div className="details-box">
                  <div className="details-img">
                    <img src = {"http://127.0.0.1:8000".concat(data.image)} style={{width:"240px",height:"300px"}}></img>
                  </div>
                  <div className="book-details">
                      <h1 style={{color:"#000"}}>{data.bookname}</h1>
                      <h5>{data.author}</h5>
                      <p>{data.description}</p>
                      <br/>
                      <br/>
                      <br/>
                      <h4>Rs.{data.cost}</h4>
                      <p>Owned by : {data.sellerid}</p>
                      <Link to="/chat" state={{senderid:data.sellerid}}><Button variant="primary" type="submit">contact seller&nbsp;<FaComment /></Button></Link>
                  </div>
              </div>
              </div>
              <h1 style={{color:"#000", paddingLeft:"3rem", marginTop:"2rem"}}>Similar books...</h1>
            </div>
                <div className="dash-body-details">   
                   {similarbook.slice(0,5).map((book)=>
                
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
                </>
        )
    
}

export default Details;