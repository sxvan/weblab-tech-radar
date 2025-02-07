import 'reflect-metadata';
import { Arg, Ctx, Mutation, Query } from 'type-graphql';
import { Technology } from '../types/technology.type';
import { ApolloServerContext } from '../contexts/apollo-server.context';
import { Prisma } from '@prisma/client';
import { CreateTechnologyInput } from '../inputs/create-technology.input';

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

    @Mutation(() => Technology)
    async createTechnology(@Arg('data', () => CreateTechnologyInput) data: CreateTechnologyInput, @Ctx() ctx: ApolloServerContext) {
        const technology: Prisma.TechnologyCreateInput = { ...data, createdAt: new Date(), changedAt: new Date() };

        return ctx.prisma.technology.create({
            data: technology,
        });
    }
}
