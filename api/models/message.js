import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    attachment: [
        {
            type: String,
        },
    ],
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    msgTime: {
        type: Date,
        default: Date.now,
    },
    conversationID: {
        type: mongoose.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

messageSchema.index({createdAt: 1, updatedAt: 1});

export const Message = mongoose.model("Message", messageSchema);