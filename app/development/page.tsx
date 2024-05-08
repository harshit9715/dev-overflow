import GraphiQlExplorer from "@/components/dev/graphiql";
import { auth } from "@clerk/nextjs/server";
const GraphiQl = async () => {
  const { getToken } = auth();
  const token = await getToken({ template: "GraphQlOidc" });
  if (!token) {
    return <div>Authenticating...</div>;
  }

  return (
    <div className="flex h-screen">
      <GraphiQlExplorer token={token} />
    </div>
  );
};

export default GraphiQl;
