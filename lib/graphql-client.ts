import { auth } from "@clerk/nextjs";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./gql/types";

let client: GraphQLClient | null = null;
export const getGraphQLRawClient = async () => {
  if (!client) {
    const token = await auth().getToken({ template: "GraphQlOidc" });
    if (!token) {
      throw new Error("No token found");
    }
    client = new GraphQLClient(process.env.GRAPHQL_SCHEMA_ENDPOINT!, {
      headers: {
        Authorization: token,
      },
    });
  }
  return client;
};

export const getGraphQLClient = async () => {
  const client = await getGraphQLRawClient();
  return getSdk(client);
};
