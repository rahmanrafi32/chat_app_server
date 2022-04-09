import {Mutations} from "../Mutations";
import {Queries} from "../Queries";
import {Subscriptions} from "../Subscriptions";

export const resolvers = {
    Query: Queries,
    Mutation: Mutations,
    Subscription: Subscriptions
};