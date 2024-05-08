import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const EditQuestion = async ({ params }: ParamsProps) => {
  const { sessionClaims } = auth();
  if (!sessionClaims?.userId) {
    return redirect("/404");
  }
  const { question } = await getQuestionById(params.id);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          userId={sessionClaims.userId as string}
          questionDetails={JSON.stringify(question)}
        />
      </div>
    </>
  );
};

export default EditQuestion;
