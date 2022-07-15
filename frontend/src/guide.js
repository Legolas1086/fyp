import React from "react";
import Nav from "./nav";
import how from "./images/how.png";
import styles from './css/guide.css';

class Guide extends React.Component{
    render(){
        return(
            <div>
               <Nav/>
               <div className="guide-body-top" style={{minHeight:"89vh"}}>
                <div className="guide-left">
                <div>
                How it works
                </div>
                <div>
                <img src={how} className="how-image"/>
                </div>
                </div>
                <div className="guide-right">
                <div style={{textAlign:"center", fontSize:"40px"}}>
                Guidelines
                </div>
                <div style={{fontSize:"20px"}}>
                <ul>
                <li>Check the book properly before trading.</li>
                <li>Trade the book at public places.</li>
                <li>Take the book off the website once it has been traded.</li>
                <li>Upload proper picture of the books.</li>
                <li>Upload the books at resoanble price to increase the chances of trade.</li>
                <li>Provide proper information of the books while posting the Ad.</li>
                <li>Trade the books at day time.</li>
                </ul>
                </div>
                </div>
               </div>
            </div>
        )
            
            
    }
}

export default Guide;