import mongoose from "mongoose";
import { ObjectId } from "mongodb";

 const claveMongoDb = 'ACA VA LA PASSWORD';

export default class MongoDBContainer {
  constructor(collection, schema) {
    mongoose.connect(
      `mongodb+srv://zuchi:${claveMongoDb}@cluster0.rvl2uyz.mongodb.net/session23?retryWrites=true&w=majority`
    );
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
