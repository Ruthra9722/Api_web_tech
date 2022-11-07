const mongoose=require("mongoose")
const customerSchema=new mongoose.Schema({
    customer_id:{type:String},
    customer_name:{type:String},
    email:{type:String},
    balance:{type:Number}
  
})
const customer=mongoose.model("customers",customerSchema)
module.exports=customer