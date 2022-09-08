import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import {ObjectId} from 'mongodb'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let path = __dirname + "/files/chat.txt";
// Funcion que graba el chat en un archivo de txt.
export const saveChat = async (chatText) => {
  try {
    await fs.promises.writeFile(path, chatText);
    console.log("guardado chat");
  } catch (error) {
    console.log("error al grabar archivo", error);
  }
};
let aux;
let copyAuthor;
let lista = [];

export const reemplaceId = (chats) => {
  for (let i=1;i<chats.length;i++){
    console.log(chats[i].author);
    copyAuthor = {
      id: chats[i]._id.toString(),
      email: chats[i].email,
      nombre: chats[i].nombre,
      apellido: chats[i].apellido,
      edad: chats[i].edad,
      alias: chats[i].alias,
      avatar: chats[i].avatar
    }

    aux = {
      id: chats[i]._id.toString(),
      author: copyAuthor,
      text: chats[i].text
    }
lista.push(aux)
  }
  return lista
}

export const upLoader = multer({ storage });

export default __dirname;
