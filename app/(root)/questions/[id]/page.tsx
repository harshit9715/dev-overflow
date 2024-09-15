import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.actions";
import { ITag } from "@/lib/database/tag.model";
import { bigNumberToString, getTimestamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const QuestionDetails = async ({ params: { id }, searchParams }: URLProps) => {
  const { question } = await getQuestionById(id);
  const { userId } = useAuth();
  if (!userId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt={question.author.username}
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="text-dark300_light700 paragraph-semibold">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              upvotes={question.upvotes.length}
              downvotes={question.downvotes.length}
              hasUpvoted={question.upvotes.includes(mongoUser._id)}
              hasDownvoted={question.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
              type={"question"}
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser._id)}
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
          value={bigNumberToString(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={bigNumberToString(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: ITag) => (
          <RenderTag
            key={tag._id as string}
            _id={tag._id as string}
            name={tag.name}
          />
        ))}
      </div>
      <AllAnswers
        questionId={JSON.stringify(question._id)}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={question.answers.length}
        filter={searchParams.filter}
        page={searchParams.page}
      />
      <div>
        <Answer
          question={question.content}
          questionId={JSON.stringify(question._id)}
          authorId={JSON.stringify(mongoUser._id)}
        />
      </div>
    </>
  );
};

export default QuestionDetails;
