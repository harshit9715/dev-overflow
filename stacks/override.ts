import { AmplifyGraphqlApi } from "@aws-amplify/graphql-api-construct";
import * as fs from "fs";
import * as path from "path";

export function overrideResolver(
  graphApi: AmplifyGraphqlApi,
  functionName: string,
  filePath: string
): void {
  const resolverConfig =
    graphApi.resources.cfnResources.cfnFunctionConfigurations[functionName];
  if (!resolverConfig) return;
  resolverConfig.requestMappingTemplateS3Location = undefined;
  resolverConfig.requestMappingTemplate = fs.readFileSync(
    path.join("stacks/resolvers", filePath),
    "utf8"
  );
}
