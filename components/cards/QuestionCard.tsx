import { bigNumberToString, getTimestamp } from "@/lib/utils";
// import { CardProps } from "@/types";
import { ITag } from "@/lib/database/tag.model";
import { IUser } from "@/lib/database/user.model";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import EditDeleteAction from "../shared/EditDeleteAction";
import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

interface QuestionProps {
  createdAt: Date;
  views: number;
  answers: string[];
  upvotes: string[];
  downvotes: string[];
  author: IUser;
  tags: ITag[];
  title: string;
  id: string;
  clerkId?: string;
}

const QuestionCard = ({
  createdAt,
  views,
  answers,
  upvotes,
  downvotes,
  author,
  tags,
  title,
  id,
  clerkId,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-row items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/questions/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* if signed in, add edit delete actions */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag: ITag) => (
          <RenderTag
            key={tag._id as string}
            _id={tag._id as string}
            name={tag.name}
          />
        ))}
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
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={bigNumberToString(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Upvotes"
            value={bigNumberToString(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={bigNumberToString(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
