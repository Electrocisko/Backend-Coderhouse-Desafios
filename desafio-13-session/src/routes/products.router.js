import { Router } from "express";
import {upLoader} from "../utils.js";
import Contenedor from "../contenedor/contenedor.js";
import MongoProducts from '../dao/mongoDao/MongoProducts.js'

let usaContenedor = new Contenedor();
const router = Router();
const productsService = new MongoProducts();

router.get("/productos", async (req, res) => {
try {
  let productos = await productsService.getAll();
  let result = JSON.stringify(productos)
  res.end(result);
} catch (error) {
  console.log('Error',error)
}
});

router.get("/productos/:id", async (req, res) => {
  let productos = await usaContenedor.getAll();
  let productID = req.params.id;
  if (isNaN(productID))
    return res.status(400).send("El id tiene que ser numerico");
  let id = parseInt(req.params.id);
  let producto = await usaContenedor.getById(id);
  producto !== null
    ? res.end(JSON.stringify(producto))
    : res.end('{ "error" : "producto inexistente"}');
});

router.post("/productos",upLoader.single('file'), async (req, res) => {
try {
  let newProduct = req.body;
  newProduct.thumbnail = req.file.filename;
  let result = await productsService.save(newProduct);
  res.send({
    message: "Producto adherido",
    code: result.code,
    id: result._id
  });
} catch (error) {
  console.log('Error', error)
}
});

router.put("/productos/:id", async (req, res) => {
  let productos = await usaContenedor.getAll();
  let productID = req.params.id;
  if (isNaN(productID))
    return res.status(400).send("El id tiene que ser numerico");
  let modifiedProduct = req.body;
  if (modifiedProduct === null)
    return res.end('{ "error" : "producto inexistente"}');
  // Elimino el producto original
  await usaContenedor.deleteById(parseInt(productID));
  // Grabo el nuevo modificado, utilizando el segundo parametro con el id original.
  await usaContenedor.save(modifiedProduct, parseInt(productID));
  res.send({
    message: "Producto Modificado",
  });
});

router.delete("/productos/:id", async (req, res) => {
  let productos = await usaContenedor.getAll();
  let productID = req.params.id;
  if (isNaN(productID))
    return res.status(400).send("El id tiene que ser numerico");
  if (productID > productos.length || productID <= 0)
    return res.status(400).send("El parametro esta fuera de rango");
  await usaContenedor.deleteById(parseInt(productID));
  res.send({
    message: "Producto Eliminado",
  });
});

export default router;
