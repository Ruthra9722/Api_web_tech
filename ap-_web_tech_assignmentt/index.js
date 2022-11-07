const app=require("./app")

const bodyParser=require('body-parser')
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose
.connect("mongodb://localhost/infos")
.then(()=>console.log("db connected"))
.catch((e)=>console.log("error"))
require("./models/customer")
require("./models/product")
require("./models/order")
app.listen(3000,()=>console.log("server is at port 3000"))