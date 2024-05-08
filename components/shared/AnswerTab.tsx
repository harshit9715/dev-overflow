import { getAllAnsweredQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  clerkId: string;
  userId: string;
}

const AnswerTab = async ({ userId, clerkId, searchParams }: Props) => {
  const { answers, isNext } = await getAllAnsweredQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10,
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
      <div className="mt-2">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={"isNext"}
        />
      </div>
    </>
  );
};

export default AnswerTab;
