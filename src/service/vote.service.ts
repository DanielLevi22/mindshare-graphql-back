import { prismaClient } from "../../prisma/prisma";

export class VoteService {
  async toggleVote(userId: string, ideiaId: string): Promise<boolean> {
    const existingVote = await prismaClient.vote.findUnique({
      where: {
        userId_ideiaId: {
          userId,
          ideiaId,
        },
      },
    });

    if (existingVote) {
      await prismaClient.vote.delete({
        where: {
          userId_ideiaId: {
            userId,
            ideiaId,
          },
        },
      });
    }

    if (!existingVote) {
      await prismaClient.vote.create({
        data: {
          userId,
          ideiaId,
        },
      });
    }

    return true;
  }

  async listVotesByIdea(ideiaId: string) {
    return await prismaClient.vote.findMany({
      where: {
        ideiaId: ideiaId,
      },
    });
  }

  async countVotes(ideiaId: string) {
    return prismaClient.vote.count({
      where: {
        ideiaId,
      },
    });
  }
}
