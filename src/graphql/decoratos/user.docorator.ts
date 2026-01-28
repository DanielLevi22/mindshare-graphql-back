import { createParameterDecorator, type ResolverData } from "type-graphql";
import type { GraphqlContext } from "../context";
import type { User } from "../../generated/prisma/client";
import { prismaClient } from "../../../prisma/prisma";

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
      if (!context || !context.user) {
        return null;
      }

      try {
        const user = await prismaClient.user.findUnique({
          where: {
            id: context.user,
          },
        });

        if (!user) throw new Error("usuario nao encontrado");
        return user;
      } catch (error) {
        console.error("Erro ao instancia GqlUser", error);
      }
    },
  );
};
