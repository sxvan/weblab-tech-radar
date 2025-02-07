import 'reflect-metadata';
import { Arg, Ctx, ID, Mutation, Query } from 'type-graphql';
import { Technology } from '../types/technology.type';
import { ApolloServerContext } from '../contexts/apollo-server.context';
import { CreateTechnologyInput } from '../inputs/create-technology.input';
import { UpdateTechnologyInput } from '../inputs/update-technology.input';

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
        return ctx.prisma.technology.create({
            data: {
                ...data,
                createdAt: new Date(),
                changedAt: new Date(),
            },
        });
    }

    @Mutation(() => Technology)
    async updateTechnology(@Arg('id', () => ID) id: string, @Arg('data', () => UpdateTechnologyInput) data: UpdateTechnologyInput, @Ctx() ctx: ApolloServerContext) {
        return ctx.prisma.technology.update({
            where: {
                id: id,
            },
            data: {
                ...data,
                changedAt: new Date(),
            },
        });
    }

    @Mutation(() => Technology)
    async deleteTechnology(@Arg('id', () => ID) id: string, @Ctx() ctx: ApolloServerContext) {
        return ctx.prisma.technology.delete({
            where: {
                id: id,
            },
        });
    }

    @Mutation(() => Technology)
    async publishTechnology(@Arg('id', () => ID) id: string, @Ctx() ctx: ApolloServerContext) {
        return ctx.prisma.technology.update({
            where: {
                id: id,
            },
            data: {
                publishedAt: new Date(),
            },
        });
    }
}
