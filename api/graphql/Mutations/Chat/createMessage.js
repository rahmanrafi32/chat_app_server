import {User} from "../../../models/user";
import {Message} from "../../../models/message";
import {pubSub} from "../../../constant/pubSub";
// import {pubSub} from "../../../constant/pubSub";

export const createMessage = async (parents, {
    payload: {
        text,
        attachment,
        receiverID,
        conversationID
    }
}, {_id}, req) => {
    try {
        let receiver = await User.findById({_id: receiverID});

        const newMessage = new Message({
            text,
            attachment,
            sender: _id,
            receiver: receiver._id,
            conversationID
        });

        await pubSub.publish("NEW_MESSAGE", {newMessage});

        // await newMessage.save();

        return {
            message: "Message sent"
        }
    } catch (err) {
        console.log(err);
    }
}