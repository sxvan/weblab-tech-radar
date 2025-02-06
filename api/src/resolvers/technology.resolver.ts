import 'reflect-metadata';
import { Arg, Ctx, Query } from 'type-graphql';
import { Technology } from '../types/technology.type';
import { ApolloServerContext } from '../contexts/apollo-server.context';

export class TechnologyResolver {
    @Query(() => [Technology])
    async technologies(@Ctx() ctx: ApolloServerContext): Promise<Technology[]> {
        return ctx.prisma.technology.findMany();
    }

    @Query(() => Technology)
    async technology(@Arg('id', () => String) id: string, @Ctx() ctx: ApolloServerContext): Promise<Technology | null> {
        return ctx.prisma.technology.findFirst({
            where: {
                id: id,
            },
        });
    }
}
