import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { ApolloServerContext } from '../contexts/apollo-server.context';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const isAuthenticated: MiddlewareFn<ApolloServerContext> = async ({ context }, next) => {
    const authHeader = context.req.headers['authorization'];

    if (!authHeader) {
        throw new Error('Not authenticated');
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        context.userId = payload.userId;
    } catch {
        throw new Error('Invalid token');
    }

    return next();
};
