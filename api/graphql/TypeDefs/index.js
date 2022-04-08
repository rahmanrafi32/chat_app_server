import {gql} from "apollo-server-core";

export const typeDefs = gql`
    type Query{
        testQueries: String
    }

    type Mutation{
        testMutation: String
    }

`;