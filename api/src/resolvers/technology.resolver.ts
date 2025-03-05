import 'reflect-metadata';
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Technology } from '../types/technology.type';
import { ApolloServerContext } from '../contexts/apollo-server.context';
import { CreateTechnologyInputWithDecorators as CreateTechnologyInput } from '../inputs/create-technology.input';
import { UpdateTechnologyInputWithDecorators as UpdateTechnologyInput } from '../inputs/update-technology.input';
import { isAuthenticated } from '../middlewares/jwt.middleware';

@Resolver()
export class TechnologyResolver {
    @Query(() => [Technology])
    @UseMiddleware(isAuthenticated)
    async technologies(@Ctx() ctx: ApolloServerContext, @Arg('onlyPublished', () => Boolean, { nullable: true }) onlyPublished?: boolean): Promise<Technology[]> {
        return ctx.prisma.technology.findMany({
            where: onlyPublished ? { publishedAt: { not: null } } : {},
        });
    }

    @Query(() => Technology)
    @UseMiddleware(isAuthenticated)
    async technology(@Arg('id', () => String) id: string, @Ctx() ctx: ApolloServerContext): Promise<Technology | null> {
        return ctx.prisma.technology.findFirst({
            where: {
                id: id,
            },
        });
    }

    @Mutation(() => Technology)
    @UseMiddleware(isAuthenticated)
    async createTechnology(@Arg('data', () => CreateTechnologyInput) data: CreateTechnologyInput, @Ctx() ctx: ApolloServerContext) {
        return ctx.prisma.technology.create({
            data: {
                ...data,
                createdAt: new Date(),
            },
        });
    }

    @Mutation(() => Technology)
    @UseMiddleware(isAuthenticated)
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
    @UseMiddleware(isAuthenticated)
    async deleteTechnology(@Arg('id', () => ID) id: string, @Ctx() ctx: ApolloServerContext) {
        return ctx.prisma.technology.delete({
            where: {
                id: id,
            },
        });
    }

    @Mutation(() => Technology)
    @UseMiddleware(isAuthenticated)
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
