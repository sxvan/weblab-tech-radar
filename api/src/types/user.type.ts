import 'reflect-metadata';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Role } from '@prisma/client';

registerEnumType(Role, { name: 'Role' });

@ObjectType('user')
export class User {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field()
    passwordHash!: string;

    @Field()
    role!: Role;
}
