const express=require('express');
const cors= require('cors');
require('./db/config');
const User=require('./db/User');
const Product = require('./db/Product');
const app = express();
const Jwt= require('jsonwebtoken');
const jwtKey= 'e-comm';

// middleware
app.use(express.json());
app.use(cors());

app.post('/register', async (req,resp)=>{
    let user=new User(req.body)
    let result= await user.save();
    result=result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if (err){
            resp.send({result:"something went wrong, please try after some time."})
        }
        resp.send({result,token:token});
    })
})

app.post('/login',async (req,resp)=>{
    if (req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if (user){
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if (err){
                    resp.send({result:"something went wrong, please try after some time."})
                }
                resp.send({user,token:token});
            })
            
        }
       else{
           resp.send({result:"No User found"});
       }
    }
    else{
        resp.send({result:"No User found"});
    } 
})

app.post('/add-product', async (req,resp)=>{
   let product= new Product(req.body);
   let result = await product.save();
   resp.send(result);
})

app.get('/products',async (req,resp)=>{
    let products=await Product.find();
    if (products.length>0){
        resp.send(products);
    }
    else{
        resp.send({result:"No Product found"});
    }

})

app.delete('/product/:id',async (req,resp)=>{
    let result= await Product.deleteOne({_id: req.params.id})
    resp.send(result);
})

app.get('/product/:id', async (req,resp)=>{
    let result= await Product.findOne({_id:req.params.id});
    if (result){
        resp.send(result);
    }
    else{
        resp.send({result:"No Record found"});
    }
})

app.put('/update/:id',async(req,resp)=>{
    let result = await Product.updateOne({_id:req.params.id},{
        $set: req.body
    })
    resp.send(result);
})

app.get('/search/:key', async(req,resp)=>{
    let result= await Product.find({
        "$or":[{// to search by any value in the database use this syntax
            name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}  
        ]
    })
    resp.send(result);
})

app.listen(5000);