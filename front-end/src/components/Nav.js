import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";



export default function Nav(){
    const navigate=useNavigate();
    const auth=localStorage.getItem('user');

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth){
            navigate('/')
        }
    },[])
    const logout= ()=>{
        localStorage.clear();
        navigate('/signup');
    }
    return(
        <div>
            <img className="logo"  alt="logo" src="https://img.freepik.com/free-vector/worldwide-e-commerce-concept_23-2147657845.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728518400&semt=ais_hybrid"/>
             {auth? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to='/add'>add Products</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).firstName})</Link></li>
                </ul>:
                <>
                <ul className="nav-ul nav-right">
                    <li><Link to='/signup'>Signup</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
               </>
            }       
        </div>
    )
}