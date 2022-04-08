import mongoose from "mongoose";

mongoose.connect(`mongodb://localhost:27017/chat_app`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    }, (err) => {
        err
            ? console.log("Database connection problem")
            : console.log("database Connected");
    })

export const db = mongoose.connection;