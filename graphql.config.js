// import type { IGraphQLConfig } from "graphql-config";
require("dotenv").config({
  path: __dirname + "/.env.local",
});

const config = {
  projects: {
    default: {
      schema: {
        [process.env.GRAPHQL_SCHEMA_ENDPOINT]: {
          headers: {
            Authorization: process.env.GRAPHQL_TEST_TOKEN,
          },
        },
      },
      documents: "./lib/graphql/**/*.graphql",
      extensions: {
        endpoints: {
          default: {
            url: `${process.env.GRAPHQL_SCHEMA_ENDPOINT}`,
            headers: { Authorization: `${process.env.GRAPHQL_TEST_TOKEN}` },
          },
        },
        codegen: {
          watch: "./lib/graphql/**/*.graphql",
          overwrite: true,
          generates: {
            "./lib/gql/types.ts": {
              plugins: [
                "typescript",
                "typescript-operations",
                "typescript-graphql-request",
              ],
            },
          },
        }
      },
    },
  },
};

module.exports = config;
