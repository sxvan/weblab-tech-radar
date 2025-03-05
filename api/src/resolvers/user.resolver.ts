import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { LoginInputWithDecorators as LoginInput } from '../inputs/login.input';
import { ApolloServerContext } from '../contexts/apollo-server.context';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

@Resolver()
export class UserResolver {
    @Mutation(() => String)
    async login(@Arg('data', () => LoginInput) loginInput: LoginInput, @Ctx() ctx: ApolloServerContext): Promise<string> {
        const user = await ctx.prisma.user.findUnique({ where: { email: loginInput.email } });
        if (!user) {
            throw new GraphQLError('No user with this email');
        }

        const isValid = await bcrypt.compare(loginInput.password, user?.passwordHash);
        if (!isValid) {
            throw new GraphQLError('Wrong password');
        }

        return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2d' });
    }
}
