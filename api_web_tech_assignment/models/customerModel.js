const mongoose=require('mongoose');


const customerSchema= new mongoose.Schema({

    customer_id:String, 
    customer_name:String,
    email:{
        type:String,
        unique:true,
    }

})

const customerModel=mongoose.model('Customer',customerSchema);
module.exports=customerModel;