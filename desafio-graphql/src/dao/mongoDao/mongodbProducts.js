import MongoDBcontainer from "./mongodbContainer.js";
import { collection, productsSchema } from '../models/product.model.js';


export default class MongoProducts extends MongoDBcontainer {
    constructor() {
        super(collection,productsSchema)
    }

    getByCategory = async (cat) => {
        let result = await this.model.find({ category: cat });
        return result;
    };


}