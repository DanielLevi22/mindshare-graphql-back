import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/auth.resolver";
import { UserResolver } from "./resolvers/use.resolver";
import { buildContext } from "./graphql/context";
import { IdeaResolver } from "./resolvers/ideia.resolver";
import { CommentResolver } from "./resolvers/comment.resolver";

async function bootstrap() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver, IdeaResolver, CommentResolver],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    }),
  );
  app.listen(
    {
      port: 400,
    },
    () => {
      console.log("server rodando na porta", 4000);
    },
  );
}

bootstrap();
