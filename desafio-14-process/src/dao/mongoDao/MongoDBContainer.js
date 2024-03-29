import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import dotenvConfig from "../../config/dotenv.config.js";

 const MONGO_URL = dotenvConfig.mongo.MONGO_URL;



export default class MongoDBContainer {
  constructor(collection, schema) {
    mongoose.connect(MONGO_URL);
    this.model = mongoose.model(collection,schema);
  }

  getAll = async () => {
    let result = await this.model.find().lean();
    return result;
  };

  save = async (document) => {
    let result = await this.model.create(document);
    return result;
  };

  getById = async (id) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    let result = await this.model.find({ _id: id });
    if (Object.keys(result).length === 0) {
      return null;
    }
    return result;
  };

  deleteById = async (id) => {
    let result = false;
    if (!ObjectId.isValid(id)) {
      return result;
    }
    let deleted = await this.model.deleteOne({ _id: id });
    deleted.deletedCount === 0 ? (result = false) : (result = true);
    return result;
  };

  update = async (id,modifiedProduct) => {
    let result = false;
    if (!ObjectId.isValid(id)) {
      return result;
    }
   let modi = await this.model.updateOne(
      { _id: id },
      { $set: modifiedProduct }
    );
    return modi;
  };
}
