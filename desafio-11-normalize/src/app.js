import express from "express";
import Contenedor from "./contenedor/contenedor.js";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import __dirname, { saveChat } from "./utils.js";
import { Server } from "socket.io";
import db from "./database/sqlite3.js";


let usaDatosContenedor = new Contenedor();
let products = [];
let mensajesChat = [];

const leeProductos = async () => {
  products = await usaDatosContenedor.getAll();
  return products;
};

const app = express();
const PORT = process.env.PORT || 8080;

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

