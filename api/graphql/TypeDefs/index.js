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

    type Query{
        testQueries: String
        signIn(payload: SignInInput): SuccessMessage!
    }

    type Mutation{
        testMutation: String
        signUp(payload: SignUpInput): SuccessMessage
    }
`;