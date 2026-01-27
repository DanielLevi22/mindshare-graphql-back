import { prismaClient } from "../../prisma/prisma";
import type { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import type { User } from "../generated/prisma/client";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

export class AuthService {
  async register(data: RegisterInput) {
    const exitingUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (exitingUser) {
      throw new Error("E-mail ja existe");
    }

    const hash = await hashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    });

    return this.generateTokens(user);
  }

  generateTokens(user: User) {
    const token = signJwt({ id: user.id, email: user.email }, "15m");
    const refreshToken = signJwt({ id: user.id, email: user.email }, "1d");
    return { token, refreshToken, user };
  }

  async login(data: LoginInput) {
    const exitingUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!exitingUser) {
      throw new Error("Usuario nao cadastrado");
    }

    const compare = await comparePassword(data.password, exitingUser.password);

    if (!compare) {
      throw new Error("dados invalidados");
    }

    return this.generateTokens(exitingUser);
  }
}
