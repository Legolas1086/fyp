import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import Nav from "./nav.js";
import { useLocation } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";
import styles from "./css/details.css"
import { Link } from "react-router-dom";



const Details=(props)=>{
    const [state,setState] = useState("1")
    const [data,setData] = useState({})

    
    const location = useLocation()
    
    useEffect(()=>{
        setState(location.state.idDetails)
        console.log(state)
        fetch("http://127.0.0.1:8000/bookdetails/?id=".concat(state))

        .then(res=>(res.json()))
        .then(res=>setData(res[0]))
        .then(console.log(data.image))
        console.log(data.image)

    },[location,state,data]);

    function handleClick(){
        localStorage.setItem('senderid',data.sellerid)
    }
    
        return(
            <div className="details-outer">
                <Nav/>
              <div className="details-body">
                  <div className="details-img">
                    <img src = {"http://127.0.0.1:8000".concat(data.image)}></img>
                  </div>
                  <div className="book-details">
                      <h1>{data.bookname}</h1>
                      <h5>{data.author}</h5>
                      <p>{data.description}</p>
                      <br/>
                      <br/>
                      <br/>
                      <h4>Rs.{data.cost}</h4>
                      <p>Owned by : {data.sellerid}</p>
                      <Link to="/chat" onClick={handleClick()}>contact seller</Link>
                  </div>
              </div>
            </div>
        )
    
}

export default Details;