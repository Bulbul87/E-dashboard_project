const express= require('express')
const cors=require('cors')
require('./DB/config');

const User = require('./DB/User');
const Product=require('./DB/product')

const jwt= require('jsonwebtoken');
const jwtkey='e-comm';
const app=express();

app.use(express.json());
app.use(cors());
app.post("/register",async (req,resp)=>{
 let user = new User(req.body);
 let result= await user.save();
 result= result.toObject();
 delete result.password
 jwt.sign({result},jwtkey,{expiresIn:"7d"},(err,token)=>{
   if(err){
 resp.send({result:"something  went wrong , please try after sometime"})
   }
   resp.send({result,auth:token});
  })
})
app.post("/login", async (req, resp) => {
   console.log(req.body)
   if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password");

    if (user){
     jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
      if(err){
    resp.send({result:"something  went wrong , please try after sometime"})
      }
      resp.send({user,auth:token});
     })
    }
    else{
        resp.send({result:"No user found"});
    }
    
   }
   else{
    resp.send({result:"No user found"});
}
        
});
app.post("/add-product", verifytoken, async(req,resp)=>{
let product=new Product(req.body);
let result= await product.save();
resp.send(result);
})
app.get("/products",verifytoken, async(req,resp)=>{
    let products=  await Product.find();
     if(products.length>0){
        resp.send(products);
     }
     else{
        resp.send({result:"No products found"});
     }

});
app.delete("/product/:id",verifytoken, async(req,resp)=>{

const result= await Product.deleteOne({_id:req.params.id})
resp.send(result);
})

app.get("/product/:id",verifytoken,async (req,resp)=>{
   let result=await Product.findOne({_id:req.params.id});
   if(result){
      resp.send(result)
   }
   else{
      resp.send({result:"No Record Found."})
   }
})
app.put("/product/:id",verifytoken,async (req,resp)=>{
let result=await Product.updateOne(
   {
     _id:req.params.id 
   },
   {
     $set:req.body 
   }
) 
resp.send (result);
})
app.get('/search/:key',verifytoken,async(req,resp)=>{
   let result= await Product.find({
     "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}}
     ] 
   });
   resp.send(result);
})
function verifytoken(req,resp,next){
   let token=req.headers['authorization'];
   if(token){
token=token.split(' ')[1];
console.warn("middleware called",token);
jwt.verify(token,jwtkey,(err,valid)=>{
if(err){
resp.status(401).send({result:"please provide valid token with header"})
}
else{
   next();
}
})
   } 
   else{
resp.status(403).send( {result :"please add token with header"});
   }


}
app.listen(5000);
