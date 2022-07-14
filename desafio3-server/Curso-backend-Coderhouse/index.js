const Contenedor = require ('./src/contenedor/contenedor');

let usaContenedor = new Contenedor();

const entornoAsincronico = async () => {

    let data = await usaContenedor.getAll();
    console.log(data);

}

entornoAsincronico();