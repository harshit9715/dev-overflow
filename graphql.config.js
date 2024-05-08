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
            'x-api-key': process.env.GRAPHQL_API_KEY,
          },
        },
      },
      documents: "./lib/graphql/**/*.graphql",
      exclude: ["stacks/amplify-schema.graphql"],
      extensions: {
        endpoints: {
          default: {
            url: `${process.env.GRAPHQL_SCHEMA_ENDPOINT}`,
            headers: { 'x-api-key': `${process.env.GRAPHQL_API_KEY}` },
          },
        },
      },
    },
  },
};

module.exports = config;
