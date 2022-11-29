import services from "../dao/index.js";

const getAllCarts = async () => {
  let data = await services.cartsService.getAll();
  return data;
};

const saveCart = async () => {
  let result = await services.cartsService.saveCart();
  return result;
};

const getCartById = async (id) => {
  let cart = await services.cartsService.getById(id);
  return cart;
};

const deleteCartById = async (id) => {
  let result = await services.cartsService.deleteById(id);
    return result;
};

const updateCart = async (cartID, newData) => {
  let result = await services.cartsService.update(cartID, newData);
  return result;
};

const getPopulateCart = async (id) => {
  let result = await services.cartsService.getByIdAndPopulate(id);
  return result;
};

export {
  getAllCarts,
  saveCart,
  getCartById,
  deleteCartById,
  updateCart,
  getPopulateCart,
};
