import { Router } from "express";
import Contenedor from "../contenedor/contenedor.js";
// const Contenedor = require('./src/contenedor/contenedor');


let usaContenedor = new Contenedor();
const router = Router();

router.get('/productos', async (req,res) => {
    let productos = JSON.stringify(await usaContenedor.getAll());
    res.end(productos);
})

export default router;