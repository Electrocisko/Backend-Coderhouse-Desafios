import express from "express";
import Contenedor from "./contenedor/contenedor.js";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import __dirname, { saveChat } from "./utils.js";
import { Server } from "socket.io";
import db from "./database/sqlite3.js";
/////////////////MONGO/////////////////////
import mongoose from 'mongoose';
import authorsService from './database/modelsMongoo/authors.js';

const URL = 'mongodb://127.0.0.1:27017/ecommerce1';
const URL_MONGO = 'mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/ecomercceA?retryWrites=true&w=majority'

mongoose.connect(URL_MONGO, err => {
  if(err){
    console.log(err)
  } else {
    console.log('Conected to database')
  }
})


const process = async () => {

let newAuthor = [{ "email":"Jackson_Kertzmann@hotmail.com","nombre":"Trever","apellido":"Steuber","edad":"37","alias":"Guadalupe29","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/642.jpg"},{"email":"Elias.Mills@hotmail.com","nombre":"Christian","apellido":"Hodkiewicz","edad":"63","alias":"Winston80","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/241.jpg"},{"email":"Maria37@hotmail.com","nombre":"Terence","apellido":"Hackett","edad":"42","alias":"Elenor90","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/194.jpg"},{"email":"Reagan_Kris52@hotmail.com","nombre":"Anissa","apellido":"Batz","edad":"46","alias":"Concepcion_Schowalter","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/293.jpg"},{"email":"Crawford_Veum61@hotmail.com","nombre":"Roosevelt","apellido":"Kub","edad":"74","alias":"Rosie.Leffler","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/195.jpg"
}]

let result = await authorsService.insertMany(newAuthor);
console.log(result);

let authors = await authorsService.find({},{'email':1, '_id':0});
console.log('authors from mongo',authors);
  //mongoose.disconnect();
} 

process();
///////////////////////////////////


let usaDatosContenedor = new Contenedor();
let products = [];
let mensajesChat = [];

const leeProductos = async () => {
  products = await usaDatosContenedor.getAll();
  return products;
};

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productsRouter);
app.use("/", express.static(__dirname + "/public"));
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const server = app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en http://localhost:${server.address().port}`
  );
});

server.on("Error", (error) => {
  console.log("Error en el servidor", error);
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("productoNuevo", (data) => {
    //En realidad  uso el callback para que ejecute leeProductos() y asi realiza un emmit actualizado
    leeProductos().then((mostrar) => {
      io.sockets.emit("listaProduct", mostrar);
    });
  });
  // al conectar lee los productos y hacen un emit a todos
  leeProductos().then((mostrar) => {
    io.sockets.emit("listaProduct", mostrar);
  });

  socket.on('mensaje', async (texto) => {
    mensajesChat.push(texto);
    io.sockets.emit('chat',mensajesChat);
    try {
      await db('chats').insert(texto); //ACA ACTUALIZO LA BASE DE DATOS
      console.log('database chat actualizado');
   } catch (error) {
     console.log(error);
   }
    saveChat(JSON.stringify(mensajesChat, null, "\t")); // saveChat Graba el chat , la funcion esta en utils.js
  })
});

