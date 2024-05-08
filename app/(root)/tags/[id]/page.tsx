import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/question.action";
import { URLProps } from "@/types";

const TagDetails = async ({ params, searchParams }: URLProps) => {
  const { tag, isNext } = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tag.name}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
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
              slug={question.slug}
              createdAt={question.createdAt}
              viewCount={question.views}
              upvoteCount={question.upvotes}
              downvoteCount={question.downvotes}
              // answers={question.answers}
              owner={question.author}
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
      <div className="mt-12">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={"isNext"}
        />
      </div>
    </>
  );
};

export default TagDetails;
