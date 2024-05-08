import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import { InteractionType } from "@/lib/gql/types";
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
  page?: string;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  filter,
  page,
}: AllAnswerProps) => {
  const { answers, isNext, totalAnswers } = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
    pageSize: 10,
  });
  return (
    <div className="mt-11 ">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {answers.map(
          (answer) =>
            answer && (
              <article
                key={answer.createdAt}
                className="light-border border-b py-10"
              >
                {/* SPAN ID */}
                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    href={`/profile/${answer.author?.id}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={answer.author?.picture || "/assets/icons/user.svg"}
                      alt={answer.author?.name || "User"}
                      width={18}
                      height={18}
                      className="rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="body-semibold text-dark300_light700">
                        {answer.author?.name}
                      </p>
                      <p className="small-regular text-light400_light500 ml-1 mt-0.5 line-clamp-1">
                        answered {getTimestamp(answer.createdAt)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end">
                    <Votes
                      upvotes={answer.upvoteCount || 0}
                      downvotes={answer.downvoteCount || 0}
                      upvoteId={
                        answer.interactions?.items.find(
                          (item) => item?.type === InteractionType.UpvoteAnswer
                        )?.id
                      }
                      downvoteId={
                        answer.interactions?.items.find(
                          (item) =>
                            item?.type === InteractionType.DownvoteAnswer
                        )?.id
                      }
                      type={"answer"}
                      itemId={answer.id}
                      userId={userId}
                    />
                  </div>
                </div>
                <ParseHTML data={answer.content} />
              </article>
            )
        )}
      </div>
      <div className="mt-6">
        <Pagination
          pageNumber={page ? +page : 1}
          isNext={`${isNext}`}
          scrollToTop={false}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
