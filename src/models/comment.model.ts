import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { IdeaModel } from "./ideia.model";

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id!: string;
  @Field(() => ID)
  content!: string;

  @Field(() => String)
  authorId!: string;

  @Field(() => String)
  ideiaId!: string;

  @Field(() => UserModel, { nullable: true })
  author?: UserModel;

  @Field(() => IdeaModel, { nullable: true })
  ideia?: UserModel;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
