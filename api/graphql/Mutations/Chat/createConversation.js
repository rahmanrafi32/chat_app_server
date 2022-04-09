import {User} from "../../../models/user";
import {Conversation} from "../../../models/conversation";

export const createConversation = async (parent, {participantID}, {_id}, req) => {
    try{
        const creator = await User.findById({_id});
        const participant = await User.findById({_id: participantID});

        const newConversation = new Conversation({
            creator: creator._id,
            participant: participant._id,
        });

        await newConversation.save();

        return {
            message: "Conversation created"
        }
    }catch (err) {
        console.log(err);
    }
};