import React from "react";
import { ReactDOM} from "react";
import Nav from "./nav.js";
import styles from './css/dash.css';
import { Link } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";



class Dashboard extends React.Component{
  
       state={
            isloading:true,
            data:['0'],
        }
    

    
    
    componentDidMount(){
        console.log(this.state.isloading)
        fetch("http://127.0.0.1:8000/books/")
        .then((response) => response.json())
        .then((res) => {console.log(res[5].bookname);
                        return res})
        .then((res) => {this.setState({data: res})
        console.log(this.state.data[0].bookname)})
        .then(this.setState({isloading:false}))
    }

    render(){
        return(
            
            <div className="dashboard-outer">
                <Nav/>
                <div className="dash-body">
                {console.log(this.state.isloading)}
                {this.state.isloading?<h1>Please wait ...</h1>:
                this.state.data.map((book)=>
                
                   <div className="content-card">
                       <Link to="/details"><img src={bookimage}></img></Link>
                       <h3>{book.bookname}</h3>
                    

                   </div>
               
                    )
                }
                
                </div>
            </div>
        
        );
    }
}

export default Dashboard;