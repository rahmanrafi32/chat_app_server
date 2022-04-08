import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(`mongodb://127.0.0.1:27017/chat_app`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const db = mongoose.connection;

db.once('open', () => {
    console.log("Local database connected");
});