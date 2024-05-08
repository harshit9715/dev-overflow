import Question from "@/components/forms/Question";
import { getUserIdByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const userId = await getUserIdByClerkId({ userId: clerkId });

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div>
        <Question userId={userId} />
      </div>
    </div>
  );
};

export default AskQuestion;
