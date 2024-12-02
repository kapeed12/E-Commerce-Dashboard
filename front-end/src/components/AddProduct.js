import React from "react";
import {useState} from 'react';

export default function AddProduct(){
    const [name,setName]= useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory]= useState("");
    const [country,setCountry]= useState("");
    const [error,setError]= useState(false);

    const addProduct = async ()=>{
        // Simple validation code of each field
        if (!name || !price || !category || !country ){
            setError(true);
            return false;
        }
        
        console.warn(name,price,category,country);
        const userId= JSON.parse(localStorage.getItem('user'))._id;
        
        let result= await fetch('http://localhost:5000/add-product',{
            method:'post',
            body: JSON.stringify({name,price,category,country,userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result= await result.json();
        console.warn(result);
    }

    return(
        <div className="add-product">
            <h1 className="addproduct-heading">Add Product.</h1>
            <input className="input-box" onChange={(e)=> setName(e.target.value)} type="text" value={name} placeholder="Enter product name"/>
            {  
              error && !name &&  <span className="error-message">Enter valid name</span>
             }
            <input className="input-box" onChange={(e)=> setPrice(e.target.value)}  type="text" value={price} placeholder="Enter price"/>
            { error && !price && <span className="error-message">Enter valid price</span>}
            <input className="input-box" onChange={(e)=> setCategory(e.target.value)} type="text" value={category} placeholder="Enter category"/>
            {error && !category && <span className="error-message">Enter valid category</span>}
            <input className="input-box" onChange={(e)=> setCountry(e.target.value)} type="text" value={country} placeholder="Enter country"/>
            {error && !country && <span className="error-message">Enter valid country</span>}
            <button onClick={addProduct} type="submit" className="submit-button">Add Product</button>
        </div>
    )
}