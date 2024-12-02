import React from "react";
import { useState ,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
export default function Signup(){
    const [firstName,setfirstName]= useState("");
    const [lastName,setlastName]= useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [mobile,setmobile]=useState("");
    const navigate=useNavigate();
    const [error,setError]= useState(false);

    
    useEffect(()=>{
        const auth= localStorage.getItem('user');
        if (auth){
            navigate('/')
        }
    })
    
    
    const collectData = async ()=>{
        // Validation code if any field is empty.
        if (!firstName || !lastName || !email || !password || !mobile){
            setError(true);
            return false;
        }
        console.warn(firstName,lastName,email,password,mobile);
        // integrate api code with reactjs
        let result= await fetch('http://localhost:5000/register',
            {
            method:'post',
            body:JSON.stringify({firstName,lastName,email,password,mobile}),
            headers:{
                'Content-Type': 'application/json'
            },
        }
        );
        result= await result.json();
        console.warn(result);
        localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token',JSON.stringify(result.token));
        navigate('/');
        
    }

    return(
        <div className="register">
            <h1 className="registration-heading">Registration</h1>
            <input className="input-box" type="text" value={firstName} onChange={(e)=> setfirstName(e.target.value)} placeholder="first name" />
            { error && !firstName && <span className="error-message">Enter valid name</span>}
            <input className="input-box" type="text" value={lastName} onChange={(e)=> setlastName(e.target.value)} placeholder="last name"/>
            { error && !lastName && <span className="error-message">Enter valid name</span>}
            <input className="input-box" value={email} onChange={(e)=> setemail(e.target.value)} type="email" placeholder="email address"/>
            { error && !email && <span className="error-message">Enter valid email</span>}
            <input className="input-box" value={password} type="password" onChange={(e)=> setpassword(e.target.value)} placeholder="enter password"/>
            { error && !password && <span className="error-message">Enter valid password</span>}
            <input className="input-box" value={mobile} type="phone" onChange={(e)=> setmobile(e.target.value)} placeholder="mobile number"/>
            { error && !mobile && <span className="error-message">Enter valid mobile no.</span>}
            <button onClick={collectData} className="submit-button" type="submit">Signup</button>

        </div>
    )
}