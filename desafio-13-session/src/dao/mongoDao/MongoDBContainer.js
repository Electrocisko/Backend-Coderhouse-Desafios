import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export default class MongoDBContainer {
  constructor(collection, schema) {
    mongoose.connect(
      "mongodb+srv://zuchi:xkT3ZDTSXyDv4hB@cluster0.rvl2uyz.mongodb.net/session23?retryWrites=true&w=majority"
    );
    this.model = mongoose.model(collection,schema);
  }

  getAll = async () => {
    let result = await this.model.find();
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
}
