import express from "express";
import Contenedor from "./contenedor/contenedor.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from './routes/views.router.js';
import __dirname from "./utils.js";



const app = express();
const PORT = 8080;
let usaContenedor = new Contenedor();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productsRouter);
app.use('/', express.static(__dirname + '/public'));
app.use('/',viewsRouter);

// Template config engine
app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');


const server = app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en http://localhost:${server.address().port}`
  );
});

server.on("Error", (error) => {
  console.log("Error en el servidor", error);
});
