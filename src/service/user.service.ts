import { prismaClient } from "../../prisma/prisma";
import type { CreateUserInput } from "../dtos/input/user.input";
export class UserService {
  async createUser(data: CreateUserInput) {
    const findUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findUser) throw new Error("usuario ja cadastrado");

    return await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async finUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("Usuário nao existe");

    return user;
  }
}
