import { Category, Classification } from '@prisma/client';
import { Field, InputType } from 'type-graphql';
import { CreateTechnologyInput } from 'shared/types/create-technology.type';

@InputType()
export class CreateTechnologyInputWithDecorators implements CreateTechnologyInput {
    @Field(() => String)
    name!: string;

    @Field(() => String)
    description!: string;

    @Field(() => Category)
    category!: Category;

    @Field(() => Classification, { nullable: true })
    classification?: Classification;

    @Field(() => String, { nullable: true })
    classificationDescription?: string;
}
