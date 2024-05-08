import { auth } from "@clerk/nextjs/server";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./gql/types";

let client: GraphQLClient | null = null;
export const getGraphQLRawClient = async (force = false) => {
  if (!client || force) {
    const { getToken } = auth();
    const token = await getToken({ template: "GraphQlOidc" });
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
  const { userId } = auth();
  if (!userId) {
    const client = new GraphQLClient(process.env.GRAPHQL_SCHEMA_ENDPOINT!, {
      headers: {
        "x-api-key": process.env.GRAPHQL_API_KEY!,
      },
    });
    return getSdk(client);
  }
  const client = await getGraphQLRawClient();
  return getSdk(client);
};
