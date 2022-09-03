import express from "express";
import Contenedor from "./contenedor/contenedor.js";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import __dirname, { saveChat } from "./utils.js";
import { Server } from "socket.io";
import db from "./database/sqlite3.js";
import {saveChatDB , conectMongo, getIdAuthor} from './database/servicesMongdb/servicesMongodb.js'

conectMongo();

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
    try {
      //await db('chats').insert(texto); //ACA ACTUALIZO LA BASE DE DATOS
   let autor = texto.author;
   let msj = texto.text;
      let id = await  getIdAuthor(autor);
      console.log('autor',autor);
      console.log('msj',msj);
      console.log('id',id);
      let result = ({
        author: id,
        text: msj
      })
    
      await saveChatDB(result) // Graba en mongo atlas
   } catch (error) {
     console.log(error);
   }

    mensajesChat.push(texto);
    io.sockets.emit('chat',mensajesChat);
 
    saveChat(JSON.stringify(mensajesChat, null, "\t")); // saveChat Graba el chat , la funcion esta en utils.js
  })
   
});

