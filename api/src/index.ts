import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { TechnologyResolver } from './resolvers/technology.resolver';
import { buildSchema } from 'type-graphql';
import { ApolloServerContext } from './contexts/apollo-server.context';
import { PrismaClient } from '@prisma/client';
import { UserResolver } from './resolvers/user.resolver';

const prisma = new PrismaClient();

const schema = await buildSchema({
    resolvers: [TechnologyResolver, UserResolver],
    validate: false,
});

const server = new ApolloServer<ApolloServerContext>({
    schema,
});

const { url } = await startStandaloneServer<ApolloServerContext>(server, {
    listen: { port: Number(process.env.API_PORT) || 4222 },
    context: async ({ req, res }) => {
        return {
            req: req,
            res: res,
            prisma: prisma,
        };
    },
});

console.log(`Server ready at ${url}`);
