"use client";
import { explorerPlugin } from "@graphiql/plugin-explorer";
import "@graphiql/plugin-explorer/dist/style.css";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { useRouter } from "next/navigation";

const GraphiQlExplorer = ({ token }: { token: string }) => {
  const router = useRouter();
  const explorer = explorerPlugin({ showAttribution: false });
  const fetcher = createGraphiQLFetcher({
    url: `${process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA_ENDPOINT}`,
    headers: {
      Authorization: token,
    },
    subscriptionUrl: `${process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT}`,
  });

  //   if window.hostname is not localhost redirect to /
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost"
  ) {
    router.push("/");
  }

  if (!token) return <div>Making sure you are authenticated...</div>;

  return <GraphiQL fetcher={fetcher} plugins={[explorer]} />;
};

export default GraphiQlExplorer;
