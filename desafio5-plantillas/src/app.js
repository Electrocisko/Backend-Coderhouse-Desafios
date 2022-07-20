import express from "express";
import Contenedor from "./contenedor/contenedor.js";
import productsRouter from "./routes/products.router.js";
// Esto 3 lineas es para poder usar __dirname con module https://exerror.com/referenceerror-__dirname-is-not-defined-in-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
const PORT = 8080;
let usaContenedor = new Contenedor();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productsRouter);
app.use('/', express.static(__dirname + '/public'));

const server = app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en http://localhost:${server.address().port}`
  );
});

server.on("Error", (error) => {
  console.log("Error en el servidor", error);
});
