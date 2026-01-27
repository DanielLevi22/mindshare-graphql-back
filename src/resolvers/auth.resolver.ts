import { Arg, Mutation, Resolver } from "type-graphql";
import { RegisterInput } from "../dtos/input/auth.input";
import type { RegisterOutput } from "../dtos/output/auth.output";
import type { AuthService } from "../service/auth.service";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async register(
    @Arg("data", () => RegisterInput) data: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.authService.register(data);
  }
}
