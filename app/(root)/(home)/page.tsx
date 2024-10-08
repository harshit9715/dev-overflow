import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { URLProps } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dev Overflow | Home Page",
  description: "Home page of Dev Overflow",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const Home = async ({ searchParams }: URLProps) => {
  let questions = [];
  let isNext = false;
  const { userId } = useAuth();
  if (searchParams?.filter === "recommended") {
    if (!userId) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const result = await getRecommendedQuestions({
      page: searchParams.page ? +searchParams.page : 1,
      pageSize: 15,
      userId,
    });
    questions = result.questions;
    isNext = result.isNext;
  } else {
    const result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
      pageSize: 15,
    });
    questions = result.questions;
    isNext = result.isNext;
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
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
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default Home;
