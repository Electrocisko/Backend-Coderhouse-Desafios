import express from "express";
import Contenedor from "./contenedor/contenedor.js";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import __dirname from "./utils.js";
import { Server } from "socket.io";

let usaDatosContenedor = new Contenedor();
let products = [];

const leeProductos = async () => {
  products = await usaDatosContenedor.getAll();
  return products;
}

const app = express();
const PORT = process.env.PORT || 8080;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productsRouter);
app.use('/', express.static(__dirname + '/public'));
app.use('/',viewsRouter);

// Template config engine
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');


const server = app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en http://localhost:${server.address().port}`
  );
});

server.on("Error", (error) => {
  console.log("Error en el servidor", error);
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('nuevo usuario conectado',socket.id);// Lo pongo para chequear en desarollo
  let datos =  leeProductos();
  datos.then((x) => {
    let mostrar = x;
    io.sockets.emit('listaProduct', mostrar)
  })
  
})