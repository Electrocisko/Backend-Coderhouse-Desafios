const express = require('express');
const Contenedor = require('./src/contenedor/contenedor');
const app = express();
const PORT = 8080;
const contenedor = require('./src/contenedor/contenedor');
let usaContenedor = new Contenedor();

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${server.address().port}`);
})

server.on('Error', (error) => {
    console.log('Error en el servidor', error);
})

app.get('/', (req,res) => {
    res.end('<h1> Desafio Servidor con Express </h1> <br> <h3>Obtener Productos: http://localhost:8080/productos</h3> <br> <h3>Obtener Producto Aleatorio: http://localhost:8080/productoRandom</h3>')
})

app.get('/productos', async (req,res) => {
    let productos = JSON.stringify(await usaContenedor.getAll());
    res.end(productos);
})

app.get('/productoRandom', async (req,res) => {
    let productos = await usaContenedor.getAll();
    let max = productos.length; // Maxima cantidad que puede randomizar
    let x = Math.ceil(Math.random() * max); // genero un numero aleatorio de id
    let productoRandom = JSON.stringify(await usaContenedor.getById(x));
    res.end(productoRandom);
})

