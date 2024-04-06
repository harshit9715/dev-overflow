import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Filter from "./Filter";
import Pagination from "./Pagination";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface AllAnswerProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: string;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  totalAnswers,
  userId,
  filter,
  page,
}: AllAnswerProps) => {
  const { answers, isNext } = await getAnswers({
    questionId: JSON.parse(questionId),
    page: page ? +page : 1,
    sortBy: filter,
    pageSize: 1,
  });
  return (
    <div className="mt-11 ">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              {/* SPAN ID */}
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt={answer.author.username}
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1 ml-1">
                      answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    upvotes={answer.upvotes.length}
                    downvotes={answer.downvotes.length}
                    hasUpvoted={answer.upvotes.includes(JSON.parse(userId))}
                    hasDownvoted={answer.downvotes.includes(JSON.parse(userId))}
                    type={"answer"}
                    itemId={JSON.stringify(answer._id)}
                    userId={userId}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-6">
        <Pagination
          pageNumber={page ? +page : 1}
          isNext={isNext}
          scrollToTop={false}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
