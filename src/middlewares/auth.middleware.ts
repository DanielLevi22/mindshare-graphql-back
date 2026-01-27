import type { MiddlewareFn } from "type-graphql";
import type { GraphqlContext } from "../graphql/context";

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
  { context },
  next,
) => {
  if (!context.user) {
    throw new Error("Usuario nao autenticado");
  }

  return next();
};
