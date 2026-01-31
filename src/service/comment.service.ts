import { prismaClient } from "../../prisma/prisma";
import type { CreateCommentInput } from "../dtos/input/comment.input";

export class CommentService {
  async create(ideiaId: string, authorId: string, data: CreateCommentInput) {
    const findIdeia = await prismaClient.idea.findUnique({
      where: {
        id: ideiaId,
      },
    });

    if (!findIdeia) throw new Error("Ideia nao encontrada");

    return prismaClient.comment.create({
      data: {
        ideiaId,
        authorId,
        content: data.content,
      },
    });
  }
}
