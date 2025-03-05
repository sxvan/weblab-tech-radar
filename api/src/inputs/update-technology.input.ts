import { Category, Classification } from '@prisma/client';
import { Field, InputType } from 'type-graphql';
import { UpdateTechnologyInput } from 'shared/types/update-technology.type';

@InputType()
export class UpdateTechnologyInputWithDecorators implements UpdateTechnologyInput {
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
