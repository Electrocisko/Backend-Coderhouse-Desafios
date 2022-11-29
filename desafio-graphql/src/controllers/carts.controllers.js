import services from "../dao/index.js";
import { ObjectId } from "mongodb";
import logger from "../config/winston.config.js";
import {
  getAllCarts,
  saveCart,
  getCartById,
  deleteCartById,
  updateCart,
} from "../services/carts.services.js";
import { getProductById } from "../services/products.services.js";

const getCartsController = async (req, res) => {
  try {
    let data = await getAllCarts();
    return res.status(200).json(data);
  } catch (error) {
    logger.log("error", `Error in getCartsController ${error} `);
    res.status(500).send({ error: error, message: "couldnt get cart" });
  }
};

const postCartsController = async (req, res) => {
  try {
    let data = await saveCart();
    res.status(201).json(data);
  } catch (error) {
    logger.log("error", `Error in postCartsController ${error} `);
    res.status(500).send({ error: error, message: "couldnt create cart" });
  }
};

const getCartByIdController = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (!ObjectId.isValid(cid))
      return res.status(400).send({ status: "error", error: "invalid id" });
    let data = await getCartById(cid);
    if (!data)
      return res
        .status(400)
        .send({ status: "error", error: "nonexistent product" });
    return res.status(201).json(data);
  } catch (error) {
    logger.log("error", `Error in getCartByIdController ${error} `);
    res.status(500).send({ error: error, message: "couldnt get  cart by id" });
  }
};

const deleteCartByIdControler = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (!ObjectId.isValid(cid))
      return res.status(400).send({ status: "error", error: "invalid id" });
    let data = await deleteCartById(cid);
    if (data.deletedCount === 0)
      return res
        .status(400)
        .send({ status: "error", error: "cart does not exist" });
    return res.status(200).json(data);
  } catch (error) {
    logger.log("error", `Error in deleteCartByIdControler ${error} `);
    res
      .status(500)
      .send({ error: error, message: "couldnt delete cart by id" });
  }
};

const getProductsInCartController = async (req, res) => {
  try {
    let cid = req.params.cid;
    if (!ObjectId.isValid(cid))
      return res.status(400).send({ status: "error", error: "invalid id" });
    let result = await services.cartsService.getByIdAndPopulate(cid);
    if (!result[0])
      return res
        .status(400)
        .send({ status: "error", error: "cart does not exist" });
    return res.status(200).json(result);
  } catch (error) {
    logger.log("error", `Error in getProductsInCartController ${error} `);
    res
      .status(500)
      .send({ error: error, message: "couldnt get cart by id and populate" });
  }
};

// ////////////////// To add products to the cart by their product id
const addProductInCartContoller = async (req, res) => {
  try {
    let productsInCart;
    let newData;
    let cartID = req.params.cid;
    if (!ObjectId.isValid(cartID))
      return res
        .status(400)
        .send({ status: "error", error: "invalid cart id" });
    let addProduct = req.body;
    let cart = await getCartById(cartID);
    if (cart === null) {
      return res
        .status(400)
        .send({ status: "error", error: "cart does not exist" });
    }
    let existProduct = await getProductById(addProduct.product);
    if (existProduct === null) {
      return res
        .status(400)
        .send({ status: "error", error: "product not exist" });
    }
    if (addProduct.quantity === undefined) {
      addProduct.quantity = 1;
    }
    productsInCart = cart.products;
    const prodIndex = productsInCart.findIndex(
      (item) => item.product.toString() === addProduct.product.toString()
    );
    if (prodIndex === -1) {
      // If there are no products, it is added directly
      productsInCart.push(addProduct); //I update the cart with the added product
    } else {
      let newCuantity =
        productsInCart[prodIndex].quantity + addProduct.quantity;
      addProduct.quantity = newCuantity;
      productsInCart.splice(prodIndex, 1); // I delete the old object and
      productsInCart.push(addProduct); // I push the new updated object
    }
    newData = {
      products: productsInCart,
    };
    let result = await updateCart(cartID, newData);
    return res.status(200).send(result);
  } catch (error) {
    logger.log("error", `Error in addProductInCartContoller ${error} `);
    res
      .status(500)
      .send({ error: error, message: "couldnt add product in cart" });
  }
};

const deletteAllProductsInCartController = async (req, res) => {
  try {
    let cartID = req.params.cid;
    if (!ObjectId.isValid(cartID))
      return res
        .status(400)
        .send({ status: "error", error: "invalid cart id" });
    let newData = { products: [] };
    let result = await updateCart(cartID, newData);
    if (result.modifiedCount === 0)
      return res
        .status(400)
        .send({ status: "error", error: "cart does not exist" });
    return res.status(200).json(result);
  } catch (error) {
    logger.log(
      "error",
      `Error in deletteAllProductsInCartController ${error} `
    );
    res
      .status(500)
      .send({ error: error, message: "couldnt delete  products in cart" });
  }
};

export {
  getCartsController,
  postCartsController,
  getCartByIdController,
  deleteCartByIdControler,
  getProductsInCartController,
  addProductInCartContoller,
  deletteAllProductsInCartController,
};
