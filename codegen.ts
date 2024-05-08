import type { CodegenConfig } from "@graphql-codegen/cli";
import { config } from "dotenv";
config({ path: ".env.local" });

const graphConfig: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: {
    [process.env.GRAPHQL_SCHEMA_ENDPOINT!]: {
      headers: {
        // Authorization: process.env.GRAPHQL_TEST_TOKEN!,
        "x-api-key": process.env.GRAPHQL_API_KEY!,
      },
    },
  },
  documents: "lib/graphql/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    "lib/gql/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default graphConfig;
