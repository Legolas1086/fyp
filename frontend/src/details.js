import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import Nav from "./nav.js";
import { useLocation } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";
import styles from "./css/details.css"
import { Link } from "react-router-dom";
import axios from "axios";



const Details=(props)=>{
    const [state,setState] = useState("1")
    const [data,setData] = useState({})
    const [similarbooks,setSimilarBooks] = useState()

    
    const location = useLocation()
        

   
    useEffect(()=>{
        setState(location.state.idDetails)
        fetch("http://127.0.0.1:8000/bookdetails/?id=".concat(location.state.idDetails))

        .then(res=>(res.json()))
        .then(res=>setData(res[0]))

        console.log(location.state.idDetails)
        fetch("http://127.0.0.1:8000/similarbooks/?id=".concat(location.state.idDetails))
        .then(res=>(res.json()))
        .then(res=>console.log(res))
    },[state,location.state.idDetails]);


    
    function wishlistClick(){
        axios.patch("http://127.0.0.1:8000/wish/",{'id':localStorage.getItem('id'),'bookid':location.state.idDetails},{
            headers: {
                'content-type': 'application/json',
            }
          }).then(res => {
            console.log(res);
          })
          .catch(err => console.log(err))
      .catch(err => console.log(err))
    }


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
                      <button onClick={wishlistClick}>Add to wishlist</button>
                      <Link to="/chat" onClick={handleClick()}>contact seller</Link>
                  </div>
              </div>
            </div>
        )
    
}

export default Details;