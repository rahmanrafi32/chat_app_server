import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import {createServer} from 'http';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {WebSocketServer} from 'ws';
import {useServer} from 'graphql-ws/lib/use/ws';
import {resolvers, typeDefs} from "./graphql";

import 'dotenv/config';
import {db} from "./constant/database";

async function startApolloServer() {
    const PORT = process.env.PORT;
    const schema = makeExecutableSchema({typeDefs, resolvers});
    const app = express();
    const httpServer = createServer(app);

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    const serverCleanup = useServer({schema}, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    app.use(express.json());
    app.get('/', (req, res) => {
        res.status(200).json("Server is running");
    })

    await server.start();
    server.applyMiddleware({app});

    httpServer.listen(PORT, () => {
        console.log(
            `Server is now running on http://localhost:${PORT}${server.graphqlPath}`,
        );
    });
};

startApolloServer().then();