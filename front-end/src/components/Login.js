import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");
    const navigate= useNavigate();
    const [error,setError]= useState(false);

    const handlelogin = async ()=>{
        // apply validation rule when field is empty
        if (!email || !password){
            setError(true);
            return false;
        }
        console.warn(email,password);
        let result= await fetch('http://localhost:5000/login',{
          method:"post",
          body:JSON.stringify({email,password}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        // data comes in readstream format. To convert it into json use json function.
        result=await result.json();
        console.warn(result);
        if (result.token){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.token));
            navigate('/');
        }
        else{
            alert('please enter correct details');
        }
    }
    return(
        <div className="login">
            <h1 className="Login-Heading">Login</h1>
            <input className="input-box" onChange={(e)=> setEmail(e.target.value)} value={email} type="text" placeholder="Enter email"/>
            {error && !email && <span className="error-message">Enter valid email</span>}
            <input className="input-box" onChange={(e)=> setPassword(e.target.value)} value={password} type="text" placeholder="Enter password"/>
            {error && !password && <span className="error-message">Enter valid password</span>}
            <button className="submit-button" onClick={handlelogin} type="submit">Login</button> 
        </div>
    )
}