import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { IdeaModel } from "./ideia.model";

@ObjectType()
export class VoteModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => String)
  ideiaId!: string;

  @Field(() => UserModel)
  user!: UserModel;

  @Field(() => IdeaModel)
  ideia!: UserModel;
}
