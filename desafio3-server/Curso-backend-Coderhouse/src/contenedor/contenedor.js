const fs = require("fs");

//Ruta donde guardo el archivo
let path = "./src/files/productos.txt";

class Contenedor {
  // Metodo que devuelve todos
  getAll = async () => {
    try {
      if (fs.existsSync(path)) {
        let data = await fs.promises.readFile(path, "utf-8");
        return JSON.parse(data);
      } else {
        let data = [];
        return data;
      }
    } catch (error) {
      console.log("No se pudo acceder", error);
    }
  };

  // Metodo que recibe un objeto y lo graba en el archivo.
  save = async (objeto) => {
    try {
      let listaDeProductos = await this.getAll();
      if (listaDeProductos.length === 0) {
        objeto.id = 1;
        listaDeProductos.push(objeto);
        await fs.promises.writeFile(
          path,
          JSON.stringify(listaDeProductos, null, "\t")
        );
      } else {
        objeto.id = listaDeProductos.length + 1;
        listaDeProductos.push(objeto);
        await fs.promises.writeFile(
          path,
          JSON.stringify(listaDeProductos, null, "\t")
        );
      }
      return objeto.id;
    } catch (error) {
      console.log("no se pudo grabar", error);
    }
  };

  // Metodo que devuelve el objeto por id o null si no hay coincidencia.
  getById = async (id) => {
    let listaDeProductos = await this.getAll();
    let objeto = listaDeProductos.find((item) => item.id === id);
    if (objeto !== undefined) {
      return objeto;
    } else {
      return null;
    }
  };
  // Metodo que borra todo el archivo.
  deleteAll = async () => {
    await fs.promises.unlink(path);
    console.log("Archivo borrado");
  };

  // Metodo que borra un producto por id
  deleteById = async (id) => {
    let objetoABorrar = await this.getById(id); // Busco el objeto por id
    if (objetoABorrar === null) {
      console.log("El producto no esta en la lista");
    } else {
      let listaDeProductos = await this.getAll(); // recupero los datos
      let indice = await listaDeProductos.findIndex((item) => item.id === id); //Busco el indice del objeto por id
      listaDeProductos.splice(indice, 1); // Elimino del array el objeto y actualizo el archivo
      await fs.promises.writeFile(
        path,
        JSON.stringify(listaDeProductos, null, "\t")
      );
    }
  };
}

module.exports = Contenedor;
