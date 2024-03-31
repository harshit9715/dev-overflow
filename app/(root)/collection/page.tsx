import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getAllSavedQuestions } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const Collections = async () => {
  const { userId } = auth();
  const { savedQuestions } = await getAllSavedQuestions({ clerkId: userId! });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {savedQuestions.length > 0 ? (
          savedQuestions.map((question: any) => (
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
            title="There's no saved question to show"
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

export default Collections;
