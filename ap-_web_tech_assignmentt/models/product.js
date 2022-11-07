const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    product_id:{type:String},
    product_type:{type:String},
    product_name:{type:String},
    product_price:{type:Number},
    available_quantity:{type:String}
})
const Product=mongoose.model("products",productSchema)
module.exports=Product