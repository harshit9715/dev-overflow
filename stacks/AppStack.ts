import {
  AmplifyGraphqlApi,
  AmplifyGraphqlDefinition,
} from "@aws-amplify/graphql-api-construct";

import { Duration } from "aws-cdk-lib";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { NextjsSite, StackContext } from "sst/constructs";

export function AppStack({ stack }: StackContext) {
  const HZ = HostedZone.fromLookup(stack, "HZ", {
    domainName: "harshit.dev",
  });

  const domainName = `${stack.stage == "dev" ? "devover" : stack.stage}flow.harshit.dev`;

  // lets create a small opensearch cluster
  // const openSearch = new aws_opensearchservice.Domain(stack, "OpenSearch", {
  //   version: aws_opensearchservice.EngineVersion.ELASTICSEARCH_7_10,
  //   capacity: {
  //     dataNodes: 1,
  //     dataNodeInstanceType: "t3.small.search",
  //     //  masterNodeInstanceType: "t3.small.search",
  //   },
  //   domainName: "devoverflow-search" + stack.stage,
  //   removalPolicy: RemovalPolicy.DESTROY,
  // });
  const graphApi = new AmplifyGraphqlApi(stack, "GraphqlApi", {
    definition: AmplifyGraphqlDefinition.fromFiles(
      "stacks/amplify-schema.graphql"
    ),
    apiName: "GraphqlApi",
    translationBehavior: {},
    transformerPlugins: [],
    authorizationModes: {
      apiKeyConfig: {
        expires: Duration.days(365),
        description: "API Key for GraphQL API - " + stack.stage,
      },
      defaultAuthorizationMode: "OPENID_CONNECT",
      oidcConfig: {
        oidcIssuerUrl: process.env.CLERK_ISSUER_BASE_URL!,
        oidcProviderName: "Clerk",
        tokenExpiryFromAuth: Duration.millis(0),
        tokenExpiryFromIssue: Duration.millis(0),
      },
    },
  });

  // lets connect a OpenSearch data source
  // graphApi.addOpenSearchDataSource("OpenSearchDS", openSearch, {
  //   description: "OpenSearch Data Source",
  //   name: "OpenSearchDS",
  // });

  new NextjsSite(stack, "DevOverflowSite", {
    customDomain: {
      hostedZone: HZ.zoneName,
      domainName,
    },
    environment: {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
      NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!,
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL!,
      NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL!,
      NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL:
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL!,
      NEXT_PUBLIC_TINY_EDITOR_API_KEY:
        process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY!,
      MONGODB_URL: process.env.MONGODB_URL!,
      NEXT_CLERK_WEBHOOK_SECRET: process.env.NEXT_CLERK_WEBHOOK_SECRET!,
      NEXT_PUBLIC_SERVER_URL: "https://" + domainName,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN!,
    },
  });

  stack.addOutputs({
    SiteUrl: "https://" + domainName,
  });
}
