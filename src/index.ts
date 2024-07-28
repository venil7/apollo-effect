import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import schema from "./graphql/schema.graphql";
import { resolvers } from "./resolvers/resolvers";

const server = new ApolloServer({
  typeDefs: readFileSync(schema).toString(),
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}grapical`);
