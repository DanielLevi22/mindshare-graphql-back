import { prismaClient } from "../../prisma/prisma";

export class UserService {
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
