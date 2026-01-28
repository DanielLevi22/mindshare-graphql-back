import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IdeaModel } from "../models/ideia.model";
import { CreateIdeiaInput, UpdateIdeiaInput } from "../dtos/input/ideia.input";
import { IdeaService } from "../service/ideia.service";
import { GqlUser } from "../graphql/decoratos/user.docorator";
import type { User } from "../generated/prisma/client";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { UserService } from "../service/user.service";

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {
  private ideiaService = new IdeaService();
  private userService = new UserService();
  @Mutation(() => IdeaModel)
  async CreateIdeia(
    @Arg("data", () => CreateIdeiaInput) data: CreateIdeiaInput,
    @GqlUser() user: User,
  ): Promise<IdeaModel> {
    return this.ideiaService.createIdeia(data, user.id);
  }

  @Mutation(() => IdeaModel)
  async UpdateIdeia(
    @Arg("data", () => UpdateIdeiaInput) data: UpdateIdeiaInput,
    @Arg("id", () => String) id: string,
  ): Promise<IdeaModel> {
    return this.ideiaService.updateIdeia(data, id);
  }

  @Query(() => [IdeaModel])
  async listIdeias(): Promise<IdeaModel[]> {
    return this.ideiaService.listIdeias();
  }

  @FieldResolver(() => UserModel)
  async author(@Root() ideia: IdeaModel): Promise<UserModel> {
    return await this.userService.finUser(ideia.authorId);
  }
}
