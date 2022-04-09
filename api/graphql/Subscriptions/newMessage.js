import {pubSub} from "../../constant/pubSub";

const messageSubscribe = (parent, args, context, info) => {
    return pubSub.asyncIterator("NEW_MESSAGE");
}

export const newMessageSubscription = {
    subscribe: messageSubscribe,
    resolve: payload => {
        // console.log("payload from subscription",payload.newMessage);
        return payload.newMessage;
    }

}