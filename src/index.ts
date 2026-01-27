import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import { buildSchema } from "type-graphql";
const typeDefs = `
type Query {
  helloWorld: String
}
`;

async function bootstrap() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server));
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
