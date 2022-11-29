import mongoose from "mongoose";

const collection = 'products';

const productsSchema = mongoose.Schema({
    name:{type:String, required: true},
    description:{type:String, required: true},
    category:{type:String, required: true, max: 10},
    price:{type:Number, required: true},
    stock:{type:Number, required: true},
    thumbnail:{type:String, required: false},
    timestamp:{type:Number},
});

export {
    collection,
    productsSchema
}