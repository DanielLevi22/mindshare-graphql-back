import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { VoteModel } from "../models/vote.model";
import { GqlUser } from "../graphql/decoratos/user.docorator";
import type { User } from "../generated/prisma/client";
import { VoteService } from "../service/vote.service";
import type { IdeaModel } from "../models/ideia.model";
import { IdeaService } from "../service/ideia.service";
import { UserModel } from "../models/user.model";
import { UserService } from "../service/user.service";

@Resolver(() => VoteModel)
export class VoteResolver {
  private voteService = new VoteService();
  private ideaService = new IdeaService();
  private userService = new UserService();

  @Mutation(() => Boolean)
  async ToggleVote(
    @Arg("ideiaId", () => String) ideiaId: string,
    @GqlUser() user: User,
  ) {
    return this.voteService.toggleVote(user.id, ideiaId);
  }

  @FieldResolver(() => VoteModel)
  async ideia(@Root() vote: VoteModel): Promise<IdeaModel> {
    return this.ideaService.findIdeiaById(vote.ideiaId);
  }

  @FieldResolver(() => VoteModel)
  async user(@Root() vote: VoteModel): Promise<UserModel> {
    return this.userService.finUser(vote.userId);
  }
}
