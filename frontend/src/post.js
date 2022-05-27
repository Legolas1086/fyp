import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import { Navigate } from "react-router-dom";
import Nav from "./nav";
import styles from "./css/post.css"
import image from "./images/upload.png"
import axios from 'axios'


const Post = (props) =>{
    const [log,setLog] = useState(false);
    const [title,setTitle] = useState("")
    const [author,setAuthor] = useState("")
    const [publisher,setPublisher] = useState("")
    const [category,setCategory] = useState("")
    const [description,setDescription] = useState("")
    const [cost,setCost] = useState("")
    const [prev,setPrev] = useState(image)
    const [img,setImg] = useState(image);

    useEffect(()=>{
        setLog(localStorage.getItem('id'))
    },[log,img,prev]);

    function handleChangeT(event){
        setTitle(event.target.value)
    }

    function handleChangeA(event){
        setAuthor(event.target.value)
    }

    function handleChangeP(event){
        setPublisher(event.target.value)
    }

    function handleChangeC(event){
        setCategory(event.target.value)
    }

    function handleChangeD(event){
        setDescription(event.target.value)
    }

    function handleChangePr(event){
        setCost(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(title,author,cost,publisher,category,description)
        let form_data = new FormData();
        console.log("before")
        
        
        form_data.append('bookname', title);
        form_data.append('author', author);
        form_data.append('category', category);
        form_data.append('publisher', publisher);
        form_data.append('description', description);
        form_data.append('image', img.image[0],img.image[0].name);
        form_data.append('cost',cost);
        form_data.append('sellerid', log);
        let url = 'http://127.0.0.1:8000/posts/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
            }
          })
              .then(res => {
                console.log(res.data);
              })
              .catch(err => console.log(err))
        
  
    }
  
    function handleImage(event){
        console.log(event.target)
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState===2){
                setPrev(reader.result)
            }
        }
        reader.readAsDataURL(event.target.files[0])
        console.log(img)
        setImg({image:event.target.files})
        console.log(img)
        
    }
    return(
        
        <div className="post-outer">
            <Nav/>
            <div className="post-body">
                <div className="post-img">
                    <img src={prev}/>
                    <input type="file" id="image" accept="image/*" onChange={handleImage} required/>
                </div>
                <div className="post-form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Title" onChange={handleChangeT} required/>
                        <input type="text" placeholder="Author" onChange={handleChangeA} required/>                    
                        <input type="text" placeholder="Publisher" onChange={handleChangeP} required/>
                        <input type="text" placeholder="Category" onChange={handleChangeC} required/>
                        <textarea rows="5" placeholder="Description" onChange={handleChangeD} required/>
                        <input type="number" pattern="[0-9]*" placeholder="Price" onChange={handleChangePr} required/>
                        <button type="submit" >submit</button>

                    </form>
                </div>
                
            </div>
           
        </div>   
            
            
        
        
    )

}

export default Post;