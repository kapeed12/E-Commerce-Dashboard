import React, { useEffect } from 'react';
import { useState } from 'react';
// return dynamic params from the current url.
import {useParams,useNavigate} from 'react-router-dom'
function UpdateProduct(){
    const [name,setName]= useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory]= useState("");
    const [country,setCountry]= useState("");
    //const [error,setError]= useState(false);
    const params= useParams();
    const navigate= useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async ()=>{
        console.warn(params);
        let result= await fetch(`http://localhost:5000/product/${params.id}`);
        result=await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCountry(result.country);
    }

    const updateProduct = async ()=>{
       console.warn(name,price,category,country);
       let result = await fetch(`http://localhost:5000/update/${params.id}`,{
        method:'Put',
        body: JSON.stringify({name,price,category,country}),
        headers:{
            'Content-Type':'application/json'
        }
       })
       result=await result.json();
       console.warn(result);
       if (result){
         navigate('/');
       }

        }
    return(
        <div className="add-product">
            <h1 className="addproduct-heading">Update Product.</h1>
            <input className="input-box" onChange={(e)=> setName(e.target.value)} type="text" value={name} placeholder="Enter product name"/>
           
            <input className="input-box" onChange={(e)=> setPrice(e.target.value)}  type="text" value={price} placeholder="Enter price"/>
            
            <input className="input-box" onChange={(e)=> setCategory(e.target.value)} type="text" value={category} placeholder="Enter category"/>
           
            <input className="input-box" onChange={(e)=> setCountry(e.target.value)} type="text" value={country} placeholder="Enter country"/>
           
            <button onClick={updateProduct} type="submit" className="submit-button">Update Product</button>
        </div>
    )
}

export default UpdateProduct;