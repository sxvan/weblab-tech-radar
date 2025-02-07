import { Category, Classification } from '@prisma/client';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateTechnologyInput {
    @Field(() => String)
    name?: string;

    @Field(() => String)
    description?: string;

    @Field(() => Category)
    category?: Category;

    @Field(() => Classification)
    classification?: Classification;

    @Field(() => String)
    classificationDescription?: string;
}
