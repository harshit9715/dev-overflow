import { getUserQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  clerkId: string;
  userId: string;
}

const QuestionTab = async ({ searchParams, clerkId, userId }: Props) => {
  const { questions, isNext } = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10,
  });
  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {questions.map((question) => (
        <QuestionCard
          key={question.title}
          clerkId={clerkId}
          createdAt={question.createdAt}
          views={question.views}
          upvotes={question.upvotes}
          downvotes={question.downvotes}
          answers={question.answers}
          author={question.author}
          tags={question.tags}
          title={question.title}
          id={question._id}
        />
      ))}
      <div className="mt-2">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </div>
  );
};

export default QuestionTab;
