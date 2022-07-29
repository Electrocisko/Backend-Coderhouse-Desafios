import express from "express";
import Contenedor from "./contenedor/contenedor.js";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";

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
  console.log("nuevo usuario conectado", socket.id); // Lo pongo para chequear en desarollo
  socket.on("productoNuevo", (data) => {
    console.log(data); // Lo pongo para chequear en desarollo
    //En realidad no uso el data, uso el callback para que ejecute leeProductos() y asi un emmit actualizado
    leeProductos().then((mostrar) => {
      io.sockets.emit("listaProduct", mostrar);
    });
  });
  // al conectar lee los productos y hacen un emit a todos
  leeProductos().then((mostrar) => {
    io.sockets.emit("listaProduct", mostrar);
  });

  socket.on('mensaje', (texto) => {
    console.log(texto)
    mensajesChat.push(texto)
    io.sockets.emit('chat',mensajesChat)
  })
});
