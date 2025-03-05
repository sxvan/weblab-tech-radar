import { Field, InputType } from 'type-graphql';
import { LoginInput } from 'shared/types/login.type';

@InputType()
export class LoginInputWithDecorators implements LoginInput {
    @Field(() => String)
    email!: string;

    @Field(() => String)
    password!: string;
}
