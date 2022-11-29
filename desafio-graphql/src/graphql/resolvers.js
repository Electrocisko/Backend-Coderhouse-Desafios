import { getUsers, getUserByEmail } from "../services/users.services.js";
import { getAllProducts } from "../services/products.services.js";
import { getPopulateCart } from '../services/carts.services.js';

const resolvers = {
  Query: {
    getAllUsers: async () => {
      let users = await getUsers();
      return users;
    },
    getProducts: async () => {
      let products = await getAllProducts();
      return products;
    },
    getUser: async (root,args) => {
        const { email } = args
        let user = await getUserByEmail(email)
        return user
    },
    getCart: async (root,args) => {
        const { _id } = args
        let cart = await getPopulateCart(_id)
        return cart[0]
    }

  },
};

export default resolvers;

