import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import {
  getAllSavedQuestions,
  getUserIdByClerkId,
} from "@/lib/actions/user.actions";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dev Overflow | Collections Page",
  description: "Collections page of Dev Overflow",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const Collections = async ({ searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    redirect("/sign-in");
  }
  const userId = await getUserIdByClerkId({ userId: clerkId });
  if (!userId) {
    redirect("/sign-in");
  }
  const { savedQuestions } = await getAllSavedQuestions({
    userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/collection"
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
          savedQuestions.map(
            (question) =>
              question && (
                <QuestionCard
                  key={question.title}
                  viewCount={question.viewCount}
                  createdAt={question.createdAt}
                  downvoteCount={question.downvoteCount}
                  upvoteCount={question.upvoteCount}
                  slug={question.slug}
                  author={question.author}
                  tags={question.tags}
                  title={question.title}
                  id={question.id}
                />
              )
          )
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
      <div className="mt-12">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={"false"}
        />
      </div>
    </>
  );
};

export default Collections;
