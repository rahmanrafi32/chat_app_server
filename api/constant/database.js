import mongoose from "mongoose";

mongoose.connect(`mongodb://localhost:27017/chat_app`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }, () => {
        console.log("Database Connected");
    })

export const db = mongoose.connection;