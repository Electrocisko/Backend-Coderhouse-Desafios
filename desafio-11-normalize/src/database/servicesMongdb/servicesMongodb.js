import mongoose from "mongoose";
import authorsService from "../modelsMongoo/authors.js";
import chatService from "../modelsMongoo/chats.js";
import { normalize, schema } from "normalizr";
import {reemplaceId} from '../../utils.js'
const URL = "mongodb://127.0.0.1:27017/ecommerce1";
const URL_MONGO =
  "mongodb+srv://zuchi:<password>@cluster0.rvl2uyz.mongodb.net/ecomercceA?retryWrites=true&w=majority";

let mensajes = [];

export const conectMongo = async () => {
  mongoose.connect(URL_MONGO, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Conected to database");
    }
  });
};

export const saveChatDB = async (data) => {
  let mensajes = await chatService.create(data);
  return mensajes;
};

export const muestroChats = async () => {
  let chats = await chatService.find().populate("author");
  return chats;
};

export const getIdAuthor = async (data) => {
  let result = await authorsService.find({ email: data });
  if (result.length === 0) return "63127ed7d964b9e19e41df0d";
  let objectid = result[0]._id;
  return objectid;
};

export const chatsNormalized = async () => {

  let chats = await muestroChats();
  let mensajesId = reemplaceId(chats)
  let mensajes = {
    id: "mensajes",
    mensajes: mensajesId,
  };
  ///NORMALIZE
  const authorSchema = new schema.Entity("authors");
  const mensajeSchema = new schema.Entity("mensajes",
   { author: authorSchema }
   );
  const blogSchema = new schema.Entity("post",{ 
    mensajes: [mensajeSchema]
  });
  const normalizedData = normalize(mensajes, blogSchema);


//return mensajesId
  return normalizedData;
};
