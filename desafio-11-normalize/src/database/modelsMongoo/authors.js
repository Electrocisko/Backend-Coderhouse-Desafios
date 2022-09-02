import mongoose from "mongoose";

const authorsCollection = 'authors';

const authorSchema = new mongoose.Schema({
    email:String,
    nombre:String,
    apellido:String,
    edad:Number,
    alias:String,
    avatar:String
});

const authorsService = mongoose.model(authorsCollection,authorSchema);

export default authorsService;