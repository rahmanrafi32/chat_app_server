import {gql} from "apollo-server-core";

export const typeDefs = gql`
    type SuccessMessage{
        message: String,
        jwt: String
    }
    
    input SignUpInput{
        firstName:String,
        lastName:String,
        email:String,
        password:String,
        phoneNumber:String
    }
    
    type Query{
        testQueries: String
    }

    type Mutation{
        testMutation: String
        signUp(payload: SignUpInput): SuccessMessage
    }

`;