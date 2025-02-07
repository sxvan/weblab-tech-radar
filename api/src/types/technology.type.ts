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

    @Field(() => Classification, { nullable: true })
    classification!: Classification | null;

    @Field(() => String, { nullable: true })
    classificationDescription!: string | null;

    @Field(() => GraphQLDateTime)
    createdAt!: Date;

    @Field(() => GraphQLDateTime, { nullable: true })
    publishedAt!: Date | null;

    @Field(() => GraphQLDateTime, { nullable: true })
    changedAt!: Date | null;
}
