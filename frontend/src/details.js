import React from "react";
import { ReactDOM } from "react";
import Nav from "./nav.js";
import bookimage from "./images/bookimage.jpg";
import styles from "./css/details.css"

class Details extends React.Component{
    state={
        isbn:"0000000001",
        data:{},
    }


    componentDidMount(){
        fetch("http://127.0.0.1:8000/bookdetails/")
        .then(res=>(res.json()))
        .then(data=>{this.setState({data:data[0]})
            console.log(this.state.data.image)})
        
        
       
    }


    render(){
        return(
            <div className="details-outer">
                <Nav/>
              <div className="details-body">
                  <div className="details-img">
                    <img src = {"http://127.0.0.1:8000".concat(this.state.data.image)}></img>
                  </div>
                  <div className="book-details">
                      <h1>{this.state.data.bookname}</h1>
                      <h5>{this.state.data.author}</h5>
                      <p>{this.state.data.description}</p>
                      <br/>
                      <br/>
                      <br/>
                      <h4>Rs.{this.state.data.cost}</h4>
                      <p>Owned by : {this.state.data.sellerid}</p>
                  </div>
              </div>
            </div>
        )
    }
}

export default Details;