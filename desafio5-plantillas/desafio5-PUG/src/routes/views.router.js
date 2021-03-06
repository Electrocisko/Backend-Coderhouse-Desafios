import { Router } from "express";
import Contenedor from "../contenedor/contenedor.js";

let usaContenedor = new Contenedor();

const router = Router();

router.get('/',(req,res) => {
  res.render('inicio')
})


router.get("/productos", async (req, res) => {
    let products = await usaContenedor.getAll();
    res.render('products.pug',{products});
  });

router.get('/nuevoProducto', (req,res )=> {
  res.render('newProduct.pug');
});





export default router;