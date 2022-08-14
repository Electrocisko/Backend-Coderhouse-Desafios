import { Router } from "express";
import {upLoader} from "../utils.js";
import Contenedor from "../contenedor/contenedor.js";
import db from "../database/sqlProductsBase.js";

let usaContenedor = new Contenedor();
const router = Router();

router.get("/productos", async (req, res) => {
  let productos = JSON.stringify(await usaContenedor.getAll());
  res.end(productos);
});

//cree una vista de productos en base de datos api/dbproductos
router.get("/dbproductos", async (req, res) => {
  try {
    let products = await db('products').select('*');
    res.send(products);
} catch (error) {
    console.log('error aca',error)
}
});

// cree una vista para los chats la ruta seria api/dbchats
router.get("/dbchats", async (req, res) => {
  try {
    let dbchats = await db('chats').select('*');
    res.send(dbchats);
} catch (error) {
    console.log(error)
}
});


router.get("/productos/:id", async (req, res) => {
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
  let newProduct = req.body;
  newProduct.thumbnail = req.file.filename;
let dato =[{...newProduct}]
try {
  let idProd = await usaContenedor.save(dato);
  res.send({
    message: "Producto adherido",
    id: idProd
  });
} catch (error) {
  console.log(error);
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

router.delete('/productos/:id', async (req,res) => {
  let productID = req.params.id;
  await usaContenedor.deleteById(productID)
   res.send({
   message: "Producto Eliminado",
  });
})


export default router;
