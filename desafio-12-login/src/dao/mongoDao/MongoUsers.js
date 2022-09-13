import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";

const collection = 'users';
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
});

export default class MongoUsers extends MongoDBContainer {
    constructor() {
        super(collection,userSchema)
    }

    getByMail = async (emailUser) => {
        let result = await this.model.findOne({ email: emailUser });
        return result;
      };
}