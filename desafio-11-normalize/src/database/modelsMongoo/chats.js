import mongoose from "mongoose";

const chatCollection = 'chats';

const chatSchema = new mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'authors'
    },
    text:String
});

const chatService = mongoose.model(chatCollection,chatSchema);

export default chatService;