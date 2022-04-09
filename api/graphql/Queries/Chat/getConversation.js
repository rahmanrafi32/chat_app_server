import {Conversation} from "../../../models/conversation";

export const getConversation = async (parents, args, {_id}, req) => {
    const conversations = await Conversation.find({
        $or: [
            {"creator": _id},
            {"participant": _id},
        ]
    })
        .populate("creator", "firstName lastName")
        .populate("participant", "firstName lastName");

    return conversations;
};