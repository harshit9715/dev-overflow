import Question from "@/components/forms/Question";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const { sessionClaims } = auth();

  if (!sessionClaims?.userId) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div>
        <Question userId={sessionClaims.userId as string} />
      </div>
    </div>
  );
};

export default AskQuestion;
