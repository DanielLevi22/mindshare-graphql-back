import { prismaClient } from "../../prisma/prisma";
import type {
  CreateIdeiaInput,
  UpdateIdeiaInput,
} from "../dtos/input/ideia.input";

export class IdeaService {
  async createIdeia(data: CreateIdeiaInput, authorId: string) {
    return prismaClient.idea.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: authorId,
      },
    });
  }
  async updateIdeia(data: UpdateIdeiaInput, id: string) {
    if (id) throw new Error("Id da ideia é obrigatorio");

    const ideia = await prismaClient.idea.findUnique({
      where: {
        id,
      },
    });

    if (!ideia) throw new Error("Ideia nao encontrada");

    return prismaClient.idea.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }
}
