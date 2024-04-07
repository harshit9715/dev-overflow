import { bigNumberToString, getTimestamp } from "@/lib/utils";
// import { CardProps } from "@/types";
import { IQuestion } from "@/lib/database/question.model";
import { IUser } from "@/lib/database/user.model";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import EditDeleteAction from "../shared/EditDeleteAction";
import Metric from "../shared/Metric";

interface AnswerProps {
  createdAt: Date;
  question: IQuestion;
  upvotes: string[];
  downvotes: string[];
  author: IUser;
  id: string;
  clerkId?: string;
}

const AnswerCard = ({
  createdAt,
  upvotes,
  downvotes,
  author,
  id,
  clerkId,
  question,
}: AnswerProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/questions/${question.id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>
        {/* if signed in, add edit delete actions */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture!}
          alt="user"
          value={author.name}
          title={`- asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={bigNumberToString(upvotes.length)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default AnswerCard;
