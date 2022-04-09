import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    participant: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    versionKey: false
});

conversationSchema.index({createdAt: 1, updatedAt: 1});

export const Conversation = mongoose.model("Conversation", conversationSchema);