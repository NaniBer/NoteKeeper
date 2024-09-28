import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT ?? "", // Replace with your Hasura GraphQL API endpoint
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET ?? "",
  },
  cache: new InMemoryCache(),
});

export default client;
