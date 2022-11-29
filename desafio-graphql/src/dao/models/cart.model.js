import mongoose from "mongoose";

const collection = 'carts';

const cartsSchema = mongoose.Schema({
    products: [
        {
            product:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'products'
            },
            quantity:{
                type:Number,
            }
        }
    ]
})

export {
    collection,
    cartsSchema
}