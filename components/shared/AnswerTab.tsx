import { getAllAnsweredQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  clerkId: string;
  userId: string;
}

const AnswerTab = async ({ userId, clerkId }: Props) => {
  const { answers, totalAnsweredQuestions } = await getAllAnsweredQuestions({
    userId,
  });
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
        {answers.length > 0 &&
          answers.map((answer) => (
            <AnswerCard
              key={answer._id}
              createdAt={answer.createdAt}
              upvotes={answer.upvotes}
              downvotes={answer.downvotes}
              question={answer.question}
              author={answer.author}
              id={answer._id}
              clerkId={clerkId}
            />
          ))}
      </div>
    </>
  );
};

export default AnswerTab;
