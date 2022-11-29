import { Router } from "express";
import checkAdmin from "../helpers/checkAuth.js";
import {
  getProductsController,
  postProductsController,
  getProductByIdController,
  deleteProductByIdControler,
  updateProductControler,
  getProductsByCategoryController
} from "../controllers/products.controllers.js";
import upLoader from '../helpers/storageImg.js';

const router = new Router();

router.get("/",getProductsController);

router.post("/", checkAdmin, upLoader.single('thumbnail') ,postProductsController);

router.get("/:pid", getProductByIdController);

router.delete("/:pid", checkAdmin, deleteProductByIdControler);

router.put("/:pid", checkAdmin, upLoader.single('thumbnail'), updateProductControler);

router.get('/categorys/:cat', getProductsByCategoryController);


export default router;
