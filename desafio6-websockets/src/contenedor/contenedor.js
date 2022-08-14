import fs from "fs";
import __dirname from "../utils.js";
import db from "../database/sqlProductsBase.js";
let path = __dirname+'/files/productos.txt';

class Contenedor {
  // Metodo modificado ahora lee desde base de datos
  getAll = async () => {
    try {
      let products = await db('products').select('*');
      return products;
    } catch (error) {
      console.log(error)
    }
  }

  // Metodo que recibe un objeto y lo graba en el archivo.
  save = async (objeto) => {
    try {
      let id = await  db('products').insert(objeto)
      console.log(id) // Control interno para verificar si llega correctamente el id
      return id;
    } catch (error) {
      console.log(error)
    }
  }

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


  deleteAll = async () => {
  try {
    await db('products').delete();
  } catch (error) {
    console.log(error)
  }};

  // Metodo que borra un producto por id
  deleteById = async (id) => {
    try {
      await db('products').where('id','=',id).del();
    } catch (error) {
      console.log(error)
    }
  }

}

export default Contenedor;
