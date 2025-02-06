import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { TechnologyResolver } from './resolvers/technology.resolver';
import { buildSchema } from 'type-graphql';
import { ApolloServerContext } from './contexts/apollo-server.context';
import { PrismaClient } from '@prisma/client';
import { GraphQLDateTime } from 'graphql-scalars';

const prisma = new PrismaClient();

const schema = await buildSchema({
    resolvers: [TechnologyResolver],
    validate: false,
});

const server = new ApolloServer<ApolloServerContext>({
    schema,
});

const { url } = await startStandaloneServer<ApolloServerContext>(server, {
    listen: { port: 4201 },
    context: async () => {
        return {
            prisma,
        };
    },
});

console.log(`Server ready at ${url}`);
