import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import Nav from "./nav.js";
import { Navigate, useLocation } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";
import styles from "./css/editbook.css"
import axios from "axios";



const EditBook=(props)=>{
    const [state,setState] = useState("1")
    const [data,setData] = useState({})
    const [price,setPrice] = useState(0)
    const [sold,setSold] = useState(false)

    
    const location = useLocation()
   
    function fetchData(){
      fetch("http://127.0.0.1:8000/bookdetails/?id=".concat(location.state.editid))
        .then(res=>(res.json()))
        .then(res=>setData(res[0]))
        .then(console.log(data.image))
        console.log(data.image)
    }
    
    useEffect(()=>{
        setState(location.state.editid)
        fetch("http://127.0.0.1:8000/bookdetails/?id=".concat(state))
        .then(res=>(res.json()))
        .then(res=>setData(res[0]))
        .then(console.log(data.image))
        console.log(data.image)
    },[state,data]);

    function handleChangePrice(event){
        setPrice(event.target.value)
    }

    function handleChangeSold(event){
        setSold(!sold)
    }

    function handleSubmit(event){
      event.preventDefault()
        axios.patch("http://127.0.0.1:8000/editbook/",{'isbn':state,'newPrice':price,'sold':sold},{
            headers: {
                'content-type': 'application/json',
            }
          }).then(res => {
            console.log(res);
          })
          .catch(err => console.log(err))
      .catch(err => console.log(err))
      
      
      document.getElementById("form").reset()
     
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
                      <form className="editbook-form" id="form" onSubmit={handleSubmit}>
                        <input type="number" placeholder="New Price" className="newprice" onChange={handleChangePrice}/>
                        <label className="checkbox"><input className = "check-box-input" type = "checkbox" onChange={handleChangeSold}/>Sold</label>
                        <button className= "submit-button" type = "submit">submit</button>
                      </form>
                  </div>
              </div>
            </div>
        )
    
}

export default EditBook;