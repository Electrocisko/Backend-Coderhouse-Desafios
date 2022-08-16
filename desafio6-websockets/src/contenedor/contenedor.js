import fs from "fs";
import __dirname from "../utils.js";
import db from "../database/sqlite3.js";
let path = __dirname + "/files/productos.txt";

class Contenedor {
  // Metodo modificado ahora lee desde base de datos
  getAll = async () => {
    try {
      let products = await db("products").select("*");
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  // Metodo que recibe un objeto y lo graba la base de datos
  save = async (objeto) => {
    try {
      let id = await db("products").insert(objeto);
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  // Metodo que devuelve el objeto por id o null si no hay coincidencia.
  getById = async (id) => {
    try {
      let productID = await db("products")
        .select("id", "title", "price", "thumbnail")
        .where("id", "=", id);
      if (productID.length === 0) {
        return null;
      }
      return productID;
    } catch (error) {
      console.log(error);
    }
  };

  deleteAll = async () => {
    try {
      await db("products").delete();
    } catch (error) {
      console.log(error);
    }
  };

  // Metodo que borra un producto por id
  deleteById = async (id) => {
    try {
      await db("products").where("id", "=", id).del();
    } catch (error) {
      console.log(error);
    }
  };

  //
  upDateProduct = async (productID, newProduct) => {
    try {
      let update = await db("products")
        .where("id", "=", productID)
        .update(newProduct);
      return update;
    } catch (error) {
      console.log(error);
    }
  };
}

export default Contenedor;
