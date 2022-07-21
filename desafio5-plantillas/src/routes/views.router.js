import { Router } from "express";
import Contenedor from "../contenedor/contenedor.js";

let usaContenedor = new Contenedor();

const router = Router();


router.get("/productos", async (req, res) => {
    let products = await usaContenedor.getAll();
    res.render('products',{products});
  });


export default router;