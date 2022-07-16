const express = require('express');
const Contenedor = require('./src/contenedor/contenedor');
const app = express();
const PORT = 8080;
let usaContenedor = new Contenedor();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/productos', async (req,res) => {
    let productos = JSON.stringify(await usaContenedor.getAll());
    res.end(productos);
})

app.get('/productos/:id', async (req,res) => {
    let productos = await usaContenedor.getAll();
    let productID = req.params.id;
    if (isNaN(productID)) return res.status(400).send('El id tiene que ser numerico');
    let id =parseInt(req.params.id);
    let producto = await usaContenedor.getById(id);
    console.log('producto por id', producto);
    producto !== null?  res.end(JSON.stringify(producto)): res.end('{ "error" : "producto inexistente"}');
})

app.post('/productos', async (req,res) => {
    let newProduct = req.body;
    console.log('funca',newProduct);
    let productID =  await usaContenedor.save(newProduct);
    res.send({
        message: "Producto adherido",
        id: productID 
    })
} )

app.put('/productos/:id', async (req,res) => {
    let productos = await usaContenedor.getAll();
    let productID = req.params.id;
    if (isNaN(productID)) return res.status(400).send('El id tiene que ser numerico');
    let modifiedProduct = req.body;
    if(modifiedProduct === null) return res.end('{ "error" : "producto inexistente"}');
    // Elimino el producto original
    await usaContenedor.deleteById(parseInt(productID)); 
    // Grabo el nuevo modificado, utilizando el segundo parametro con el id original.
    await usaContenedor.save(modifiedProduct,parseInt(productID));
    res.send({
        message: "Producto Modificado"
    })
})

app.delete('/productos/:id', async (req,res) => {
    let productos = await usaContenedor.getAll();
    let productID = req.params.id;
    if (isNaN(productID)) return res.status(400).send('El id tiene que ser numerico');
    if (productID > productos.length || productID <=0) return res.status(400).send('El parametro esta fuera de rango');
    await usaContenedor.deleteById(parseInt(productID));
    res.send({
        message: "Producto Eliminado"
    })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${server.address().port}`);
})

server.on('Error', (error) => {
    console.log('Error en el servidor', error);
})
