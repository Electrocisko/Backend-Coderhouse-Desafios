import { Router } from "express";
import Contenedor from "../contenedor/contenedor.js";
import {productos} from '../Mocks/faker.js'


let usaContenedor = new Contenedor();

const router = Router();

router.get('/',(req,res) => {
  res.render('inicio')
})


router.get("/productos", async (req, res) => {
    let products = await usaContenedor.getAll();
    res.render('products',{products});
  });

router.get('/nuevoProducto', (req,res )=> {
  res.render('newProduct');
});

router.get('/productos-test', (req,res) => {
  res.send(productos)
})



export default router;