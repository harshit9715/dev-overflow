import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/question.action";
import { URLProps } from "@/types";

const TagDetails = async ({ params }: URLProps) => {
  const { tag } = await getQuestionsByTagId({ tagId: params.id });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tag.name}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {tag.questions.length > 0 ? (
          tag.questions.map((question: any) => (
            <QuestionCard
              key={question.title}
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
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break silence 🚀 Ask a Question and kickstart the
                  discussion. out query could be the next big thing others learn from. Get
                  Involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default TagDetails;
