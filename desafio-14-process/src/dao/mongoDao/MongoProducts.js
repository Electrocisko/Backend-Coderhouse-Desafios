import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";

const collection = 'products';
const productsSchema = mongoose.Schema({
    title:{type:String, required: true},
    description:{type:String, required: true},
    code:{type:String, required: true, max: 10},
    price:{type:Number, required: true},
    stock:{type:Number, required: true},
    thumbnail:{type:String, required: true}
})

export default class MongoProducts extends MongoDBContainer{
    constructor(){
        super(collection,productsSchema);
    }
}