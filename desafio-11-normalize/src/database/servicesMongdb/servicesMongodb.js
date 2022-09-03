import mongoose from 'mongoose';
import authorsService from '../modelsMongoo/authors.js';
import chatService from "../modelsMongoo/chats.js";

const URL = 'mongodb://127.0.0.1:27017/ecommerce1';
const URL_MONGO = 'mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/ecomercceA?retryWrites=true&w=majority'

export const conectMongo = async () =>{
  mongoose.connect(URL_MONGO, err => {
    if(err){
      console.log(err)
    } else {
      console.log('Conected to database')
    }
  })
}


const process = async () => {
let authors = await authorsService.find({},{'email':1});
console.log('authors from mongo',authors);
  //mongoose.disconnect();
} 
process();

export const saveChatDB = async (data) => {
  let mensajes = await chatService.create(data)
  let chats = await chatService.find().populate('author');
  console.log(chats)
}

export const muestroChats = async () => {
  let chats = await chatService.find();
};

export const getIdAuthor = async(data) => {
  let result = await authorsService.find({'email':data}) 
  let objectid = result[0]._id;
  return objectid
}