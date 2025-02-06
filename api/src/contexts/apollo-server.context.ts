import { PrismaClient } from '@prisma/client';

export interface ApolloServerContext {
    prisma: PrismaClient;
}
