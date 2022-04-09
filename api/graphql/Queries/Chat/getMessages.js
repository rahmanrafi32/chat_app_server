import {Message} from "../../../models/message";

export const getMessages = async (parents, {conversationID}, {_id}, req) => {

    const messages = await Message.find({
        $and: [
            {conversationID},
            {
                $or: [
                    {"sender": _id},
                    {"receiver": _id},
                ]
            }
        ]
    })
        .sort('-createdAt')
        .populate("sender", "firstName lastName")
        .populate("receiver", "firstName lastName")

    return messages;
};