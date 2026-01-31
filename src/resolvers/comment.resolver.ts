import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { CommentModel } from "../models/comment.model";
import { CreateCommentInput } from "../dtos/input/comment.input";
import { CommentService } from "../service/comment.service";
import { GqlUser } from "../graphql/decoratos/user.docorator";
import type { User } from "../generated/prisma/client";
import { IdeaModel } from "../models/ideia.model";
import { IdeaService } from "../service/ideia.service";
import { UserModel } from "../models/user.model";
import { UserService } from "../service/user.service";

@Resolver(() => CommentModel)
export class CommentResolver {
  private commentService = new CommentService();
  private ideaService = new IdeaService();
  private userService = new UserService();
  @Mutation(() => CommentModel)
  async CreateComment(
    @Arg("ideiaId", () => String) ideiaId: string,
    @Arg("data", () => CreateCommentInput) data: CreateCommentInput,
    @GqlUser() user: User,
  ): Promise<CommentModel> {
    return this.commentService.create(ideiaId, user.id, data);
  }

  @FieldResolver(() => IdeaModel)
  async ideia(@Root() comment: CommentModel): Promise<IdeaModel> {
    return this.ideaService.findIdeiaById(comment.ideiaId);
  }
  @FieldResolver(() => UserModel)
  async author(@Root() comment: CommentModel): Promise<UserModel> {
    return await this.userService.finUser(comment.authorId);
  }
}
