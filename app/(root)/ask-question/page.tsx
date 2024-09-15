import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.actions";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div>
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
