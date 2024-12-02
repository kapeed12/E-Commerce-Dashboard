import React from "react";
import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
function Products(){
    const [products,setProducts]= useState([]);
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts=async ()=>{
        // result is in readstream format
         let result=await fetch('http://localhost:5000/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
         });
         // convert result to json.
         result= await result.json();
         setProducts(result);
    }

    const deleteProduct= async(id)=>{
        let result= await fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete'
        })
        result=await result.json();
        if (result){
            alert('record is deleted');
            getProducts();
        }
    }

    const searchHandle=async (e)=>{
       let key = e.target.value;
       if (key){
        let result= await fetch(`http://localhost:5000/search/${key}`);
        result=await result.json();
        if (result){
         setProducts(result);
        }
       }
       else{
        getProducts();
       }
       

    }
    

    return(
        <div className="product-list">
            <h3>Product List</h3>
            <input className="search-box" type="text" placeholder="Search Product" onChange={searchHandle}/>
            <ul>
                <li>Sr.no</li>
                <li>Name</li>
                <li>price</li>
                <li>category</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0? products.map((item,index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>${item.price}</li>
                <li>{item.category}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/"+item._id}>Update</Link></li>
            </ul>)
            :<h1>No Record Found</h1>
            }
        </div>
    )
}
export default Products;