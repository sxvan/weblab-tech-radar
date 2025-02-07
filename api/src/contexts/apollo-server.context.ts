import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';

export interface ApolloServerContext {
    req: IncomingMessage;
    res: ServerResponse<IncomingMessage>;
    prisma: PrismaClient;
    userId?: string;
}
