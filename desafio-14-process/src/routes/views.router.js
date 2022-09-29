import { Router } from "express";
import MongoProducts from "../dao/mongoDao/MongoProducts.js";

import Contenedor from "../contenedor/contenedor.js";

let usaContenedor = new Contenedor();
const userService = new MongoProducts(); 

const router = Router();

router.get('/',(req,res) => {
  res.render('inicio')
});

router.get("/productos", async (req, res) => {
    let products = await userService.getAll();
    res.render('products',{products});
  });

router.get('/nuevoProducto', (req,res )=> {
  if(!req.session.user) return res.redirect('/login');
  res.render('newProduct',{user:req.session.user});
});

router.get('/login', (req,res) => {
  res.render('login');
});

router.get('/register',(req,res) => {
  res.render('register');
});

router.get('/errorlogin',(req,res) => {
  res.render('errorLogin')
});

router.get('/errorregister',(req,res) => {
  res.render('errorRegister')
});

export default router;