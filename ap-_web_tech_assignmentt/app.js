const express=require("express")
const app=express()
const infoRoute=require("./routes/info")
const product=require("./models/product")
const customer=require("./models/customer")
const order=require("./models/order")

const bodyParser=require('body-parser')

app.use(express.json())
app.use("/",infoRoute)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/product', async(req, res) => {
    const data=await product.find()
    res.send(data)
  })
  app.post("/product",async(req,res)=>{
   const product_id=req.body.product_id
   const product_type=req.body.product_type
   const product_name=req.body.product_name
   const product_price=req.body.product_price
   const available_quantity=req.body.available_quantity
   try {
    const data=await product.insertMany({
         product_id,
         product_type,
         product_name,
         product_price,
         available_quantity
    })
    if(data){
        return res.send("product added")
       }
   } catch (error) {
    return res.send(error.message)
   }
  })
  app.get("/customer",async(req,res)=>{
    const cust=await customer.find()
    res.send(cust)
  })
  app.post("/customer",(req,res)=>{
   const customer_id=req.body.customer_id
   const customer_name=req.body.customer_name
   const email=req.body.email
   const balance=req.body.balance
   try {
    const cust=customer.insertMany({
        customer_id,
        customer_name,
        email,
        balance
    })
    if(cust) return res.send("user Added")
   } catch (error) {
    return res.send(error.message)
   }
  
  })
  app.get("/order",async(req,res)=>{
    const ord=await order.find()
    res.send(ord)
  })
  app.post("/order",(req,res)=>{
   const customer_id=req.body.customer_id
   const product_id=req.body.product_id
   const product_Name=req.body.product_Name
   const quantity=req.body.quantity
   const order_id=req.body.order_id
    try {
        const ord=order.insertMany({
            customer_id,
            product_id,
            product_Name,
            quantity,
            order_id
        })
        if(ord) return res.send("order created")
    } catch (error) {
        return res.send(error.message)
    }
  })
  app.get("/orders/orderID",async(req,res)=>{
    const ordId=req.body.order_id
    const ord=await order.findOne({order_id:ordId})
    if(!ord) return res.send("no order Id")
    res.send(ord)
  })
  app.get("/product/productID",async(req,res)=>{
    const prdID=req.body.product_id
    const ord=await order.findOne({product_id:prdID})
    if(!ord) return res.send("no product Id")
    res.send(ord)
  })
  app.get("/customer/customerID",async(req,res)=>{
    const cstID=req.body.customer_id
    const ord=await order.findOne({customer_id:cstID})
    if(!ord) return res.send("no customer Id")
    res.send(ord)
  })
  app.get("/product/productType",async(req,res)=>{
    const prdType=req.body.product_type
    const ord=await order.findOne({product_type:prdType})
    if(!ord) return res.send("no productType ")
    res.send(ord)
  })
  app.put("/productName/availableQuantity",async(req,res)=>{
    const available_quantity=req.body.available_quantity
    const product_name=req.body.product_name
    const qua= await product.findOne({product_name})
    if(qua.available_quantity==0) return res.send("out of stock")
    // console.log(qua)
    const updata=await product.updateOne({product_name},{$set:{available_quantity:available_quantity}})
  if(updata) return res.send(" quantity updated")
  }
  )
  app.put("/email/costOfAnOrder",async(req,res)=>{
    const balance=req.body.balance
    const email=req.body.email
    const qua= await customer.findOne({email})
    if(qua.balance==0) return res.send("insufficient fund")
    const updata=await customer.updateOne({email},{$set:{balance:balance}})
  if(updata) return res.send(" balance updated")
  }
  )
 
  
module.exports=app