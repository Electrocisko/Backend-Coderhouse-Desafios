import { gql } from 'apollo-server-express';

const typeDefs = gql`

    type User {
        _id: ID
        name: String
        email: String
        password: String
        address: String
        age: String
        phoneNumber: String
        cart: ID
    }

    type Product {
        _id: ID
        name: String
        description: String
        category: String
        price: Float
        stock: Int
        thumbnail: String
    }

    type Cart {
        _id: ID
        products: [ProductsInCart]
    }

    type ProductsInCart {
        product: Product
        quantity: Int
    }

    type Query {
        getAllUsers: [User]
        getProducts: [Product]
        getUser(email:String): User
        getCart(_id: ID): Cart
    }
`

export default typeDefs;