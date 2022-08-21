const mongoose=require("mongoose");

const inventorySchema=new mongoose.Schema({

    inventory_id:String,
    inventory_type:String, 
    item_name:String, 
    available_quantity:Number
 
});

const inventoryModel=mongoose.model("Inventory",inventorySchema);
module.exports=inventoryModel