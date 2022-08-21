const express =require('express')
const mongoose=require('mongoose');
const server=express();

const inventoryController=require("./routes/inventory")
const customerController=require("./routes/customer")
const orderController=require("./routes/order")

const PORT=7000;

server.use(express.json());
server.use(express.urlencoded({extended: false}));



server.listen(PORT,(err)=>{
    if(!err){
        console.log("Server Started")
    }else{
        console.log(err)
    }
});

mongoose.connect("mongodb://localhost/api_web_tech_assignmnet",(err)=>{
    if(!err){
        console.log("server connected to DB")
    }else{
        console.log(err)
    }
});

server.get('/',(req,res)=>{
    res.send('routes connected')
});

server.use("/add",inventoryController)
server.use("/add",customerController)
server.use("/add",orderController)
