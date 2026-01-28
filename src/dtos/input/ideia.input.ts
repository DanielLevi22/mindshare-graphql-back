import { Field, InputType } from "type-graphql";

@InputType()
export class CreateIdeiaInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

@InputType()
export class UpdateIdeiaInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
