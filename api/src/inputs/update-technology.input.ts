import { Category, Classification } from '@prisma/client';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateTechnologyInput {
    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Category, { nullable: true })
    category?: Category;

    @Field(() => Classification, { nullable: true })
    classification?: Classification;

    @Field(() => String, { nullable: true })
    classificationDescription?: string;
}
