import { Router } from "express";
import {
  getCartsController,
  postCartsController,
  getCartByIdController,
  deleteCartByIdControler,
  addProductInCartContoller,
  getProductsInCartController,
  deletteAllProductsInCartController
} from "../controllers/carts.controllers.js";

const router = new Router();

router.get('/',getCartsController);

router.post('/',postCartsController);

router.get('/:cid',getCartByIdController);

router.delete('/:cid',deleteCartByIdControler);

router.get("/:cid/products", getProductsInCartController );

router.put("/:cid/products", addProductInCartContoller );

router.put('/:cid',deletteAllProductsInCartController);

export default router;