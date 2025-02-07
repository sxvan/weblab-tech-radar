import 'reflect-metadata';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Category, Classification } from '@prisma/client';
import { GraphQLDateTime } from 'graphql-scalars';

registerEnumType(Category, { name: 'Category' });
registerEnumType(Classification, { name: 'Classification' });

@ObjectType()
export class Technology {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String)
    description!: string;

    @Field(() => Category)
    category!: Category;

    @Field(() => Classification)
    classification?: Classification | null;

    @Field(() => String)
    classificationDescription?: string | null;

    @Field(() => GraphQLDateTime)
    createdAt!: Date;

    @Field(() => GraphQLDateTime)
    publishedAt?: Date | null;

    @Field(() => GraphQLDateTime)
    changedAt?: Date | null;
}
