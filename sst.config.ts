import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";

export default {
  config(_input) {
    return {
      name: "dev-overflow",
      region: "ap-south-1",
    };
  },
  stacks(app) {
    //? to make graphql amplify transformer work
    app.node.setContext("amplifyEnvironmentName", app.stage);

    // stacks
    app.stack(AppStack);
  },
} satisfies SSTConfig;
