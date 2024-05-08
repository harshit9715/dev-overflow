import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionBySlug } from "@/lib/actions/question.action";
import { InteractionType } from "@/lib/gql/types";
import { bigNumberToString, getTimestamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const QuestionDetails = async ({ params: { id }, searchParams }: URLProps) => {
  const { sessionClaims } = auth();
  if (!sessionClaims?.userId) {
    redirect("/sign-in");
  }
  const { question, actions, questionId } = await getQuestionBySlug(
    id,
    sessionClaims.userId as string
  );
  if (!question || !questionId) {
    return redirect("/404");
  }

  const upvoteId = actions.find(
    (action) => action?.type === InteractionType.UpvoteQuestion
  )?.id;
  const downvoteId = actions.find(
    (action) => action?.type === InteractionType.DownvoteQuestion
  )?.id;

  const saveId = actions.find(
    (action) => action?.type === InteractionType.SaveQuestion
  )?.id;

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.owner.id}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.owner.picture || "/assets/icons/user.svg"}
              alt={question.owner.name || "User"}
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="text-dark300_light700 paragraph-semibold">
              {question.owner?.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              upvotes={question.upvoteCount || 0}
              downvotes={question.downvoteCount || 0}
              upvoteId={upvoteId}
              downvoteId={downvoteId}
              saveId={saveId}
              type={"question"}
              itemId={questionId}
              userId={question.owner.id || ""}
            />
          </div>
        </div>
        <h2 className="h2-bold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Upvotes"
          value={bigNumberToString(question.upvoteCount || 0)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={bigNumberToString(question.viewCount || 0)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags?.items.map(
          (tag, ix) =>
            tag && (
              <RenderTag
                key={tag.tag.label}
                _id={`${tag.tag.label}`}
                name={`${tag.tag.label}`}
              />
            )
        )}
      </div>
      <AllAnswers
        questionId={questionId}
        userId={question.owner.id || ""}
        filter={searchParams.filter}
        page={searchParams.page}
      />
      <div>
        <Answer
          question={question.content}
          questionId={questionId}
          authorId={question.owner.id || ""}
        />
      </div>
    </>
  );
};

export default QuestionDetails;
