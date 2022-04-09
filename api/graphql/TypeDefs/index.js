import {gql} from "apollo-server-core";

export const typeDefs = gql`
    type SuccessMessage{
        message: String,
        access_token:String,
        refresh_token: String
    }

    input SignUpInput{
        firstName:String,
        lastName:String,
        email:String,
        password:String,
        phoneNumber:String
    }

    input SignInInput{
        email: String,
        password:String
    }

    type User{
        id:ID,
        firstName: String,
        lastName: String,
        email: String,
        status:String,
        phoneNumber:String,
        profilePic: String,
        deviceToken: [String],
    }

    type Conversation{
        _id: ID,
        creator: User,
        participant: User,
        lastUpdated: String
    }

    input MessageInput{
        text: String,
        attachment:[String],
        receiverID:ID,
        conversationID:ID
    }

    type Message{
        _id:ID,
        text: String,
        sender: User,
        receiver: User,
        msgTime: String
    }

    type SubscribeMessage{
        _id:ID,
        text: String,
        sender: String,
        receiver: String,
        msgTime: String
    }
    
    type Query{
        testQueries: String
        signIn(payload: SignInInput): SuccessMessage!
        getConversation:[Conversation]
        getMessages(conversationID: ID):[Message]
    }

    type Mutation{
        testMutation: String
        signUp(payload: SignUpInput): SuccessMessage
        createConversation(participantID: ID,):SuccessMessage
        createMessage(payload: MessageInput):SuccessMessage
    }

    type Subscription{
        newMessageSubscription: SubscribeMessage
    }
`;