import MongoDBcontainer from "./mongodbContainer.js";
import { collection, usersSchema} from '../models/user.model.js';
import logger from "../../config/winston.config.js";


  export default class MongoUsers extends MongoDBcontainer {
    constructor() {
        super(collection, usersSchema)
    }

    getByMail = async (mail) => {
        let result = await this.model.findOne({ email: mail });
        return result;
    };
  }