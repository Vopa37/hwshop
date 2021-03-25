const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
    id:{type:String,required:true},
    name: {type:String,required:true},
    price:{type:String,required:true},
    image:{type:String,required:true}
});

const items = new Schema({
    data: {type:[product],required:true},
    count: {type:Number,required:true},
});

const orderSchema = new Schema({
    userId: {type:String,required:true},
    items: {type:[items], default: undefined, required:true},
    price: {type:Number,required:true},
    completed:{type:Boolean,defaultValue:false},
},{
    timestamps:true,
})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;