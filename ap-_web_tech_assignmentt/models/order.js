const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    customer_id:{type:String},
    product_id:{type:String},
    product_name:{type:String},
    quantity:{type:Number},
    order_id:{type:String}
})
const order=mongoose.model("orders",orderSchema)
module.exports=order