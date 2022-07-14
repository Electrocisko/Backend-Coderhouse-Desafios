const Contenedor = require('./src/contenedor/contenedor');

let usaContenedor = new Contenedor();

const entornoAsincronico = async () => {

    //Hago una consulta del archivo.

    console.log('El archivo inicialmente tiene: ', await usaContenedor.getAll());
    

    // Creo 3 objetos 
    let producto1 = {
        title: 'Shampoo Pantene',
        price: 630,
        thumbnail: 'https://farmacityar.vteximg.com.br/arquivos/ids/207723-600-600/220335_shampoo-pantene-miracle-fuerza-y-reconstruccion-x-400-ml_imagen-1.jpg?v=637495988920270000'
    }   
 
    let producto2 = {
        title: 'Acondicionador Pantene',
        price: 450,
        thumbnail: 'https://farmacityar.vteximg.com.br/arquivos/ids/204300-600-600/157030_acondicionador-pantene-pro-v-3-minute-miracle-restauracion-x-170-ml_imagen-1.jpg?v=637388824989600000'
    }   
    let producto3 = {
        title: 'Dentrifico Colgate',
        price: 288,
        thumbnail: 'https://farmacityar.vteximg.com.br/arquivos/ids/219151-600-600/225144_colgate-crdnatural-extx-70g-carbon.jpg?v=637788246881770000'
    }   
    // Ingreso cada producto al archivo 

    
   await usaContenedor.save(producto1);
   await usaContenedor.save(producto2);
   await usaContenedor.save(producto3);

// Hago una consulta de todos los archivos nuevamenete

console.log('El archivo actualizado  tiene: ', await usaContenedor.getAll());

// Obtengo el producto por id. en este ejemplo el del numero 2

console.log('El producto con el Id 2 es :' ,await usaContenedor.getById(2)); 

// Borro el producto con id2
console.log('Borro el producto con id=2 ', await usaContenedor.deleteById(2));

//Trato de borrar un producto con un id inexsistente
console.log('Borro producto con id:100 ',await usaContenedor.deleteById(100));
    
//Vuelvo consultar todos los elementos, para chequear que haya borrado el id2.
console.log('El archivo actualizado  tiene: ', await usaContenedor.getAll());


   //Borro el archivo lo deje comentado para que se puede ver el archivo grabado.
  // await usaContenedor.deleteAll(); 
}

entornoAsincronico()