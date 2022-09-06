import { Router } from "express";
import Contenedor from "../contenedor/contenedor.js";
import {productos} from '../Mocks/faker.js'
import {muestroChats, chatsNormalized} from '../database/servicesMongdb/servicesMongodb.js'


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


router.get('/chats',async (req,res) => {
  let result = await muestroChats()
  let mensajes = {
    id: 'mensajes',
    mensajes: result
  }
  res.send(mensajes)
})

router.get('/chatsnormalizado',async (req,res) => {
 let result = await chatsNormalized();
 res.send(result);
})

export default router;