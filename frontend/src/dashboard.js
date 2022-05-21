import React from "react";
import { ReactDOM} from "react";
import Nav from "./nav.js";
import styles from './css/dash.css';
import { Link } from "react-router-dom";
import bookimage from "./images/bookimage.jpg";



class Dashboard extends React.Component{
    render(){
        return(
            <div className="dashboard-outer">
                <Nav/>

                <div className="dash-body">
                   <h1 >Dashboard is being developed</h1>
                   <h2>wait</h2>
                   <div className="content-card">
                       <Link to="/details"><img src={bookimage}></img></Link>
                       <h3>Title</h3>
                    

                   </div>
                </div>
                
            </div>
        );
    }
}

export default Dashboard;