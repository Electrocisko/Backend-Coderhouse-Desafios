
import services from "../dao/index.js";

const getAllProducts = async () => {
  let data = await services.productsService.getAll();
  return data;
};

const saveProducts = async (data) => {
  await services.productsService.save(data);
  return data;
};

const getProductById = async (id) => {
  let product = await services.productsService.getById(id);
  return product;
};

const deleteProductById = async (id) => {
  let result = await services.productsService.deleteById(id);
  return result;
};

const updateProduct = async (id, newData) => {
  let result = await services.productsService.update(id, newData);
  return result;
};

const getProductsByCategory = async (cat) => {
  let data = await services.productsService.getByCategory(cat)
  return data;
}


export {
  getAllProducts,
  saveProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  getProductsByCategory
};
