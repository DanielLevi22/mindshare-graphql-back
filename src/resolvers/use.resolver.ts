import { Arg, Query, Resolver } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../service/user.service";

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.finUser(id);
  }
}
