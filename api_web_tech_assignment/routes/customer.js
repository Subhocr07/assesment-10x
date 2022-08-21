const express=require('express');
const router=express.Router();
const customerModel=require("../models/customerModel");


router.post("/customer",(req,res)=>{
    customerModel.find({email:req.body.email}).then((existUser)=>{
             if(existUser.length){
                res.status(400).send(`${req.body.email} already exist`)
             }else{
                 customerModel.create({
                    customer_id:req.body.customerId,
                    customer_name:req.body.customerName,
                    email:req.body.email
                 }).then((data)=>{
                     res.status(200).send(data)
                 }).catch((err)=>{
                     res.status(400).send(err)
                 })
             }
    }).catch((err)=>{
        res.status(401).send(err)
    })
     
 });
 
 router.get("/user_details",(req,res)=>{
     customerModel.find().then((customerList)=>{
         res.send(customerList)
     }).catch((err)=>{
         res.send(err)
     })
 })
 
 module.exports=router