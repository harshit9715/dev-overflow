"use client";
import { voteAnswer } from "@/lib/actions/answer.action";
import { viewItem } from "@/lib/actions/interaction.action";
import { voteQuestion } from "@/lib/actions/question.action";
import { saveQuestion } from "@/lib/actions/user.actions";
import { bigNumberToString } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface VoteProps {
  upvotes: number;
  downvotes: number;
  type: "question" | "answer";
  itemId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  upvotes,
  downvotes,
  type,
  itemId,
  userId,
  hasUpvoted,
  hasDownvoted,
  hasSaved,
}: VoteProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (type === "question") {
      viewItem({
        type,
        itemId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined,
      });
    }
  }, [itemId, userId, pathname, router]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) return;
    if (type === "question") {
      voteQuestion({
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        hasdownVoted: voteType === "downvote",
        hasupVoted: voteType === "upvote",
        path: pathname,
      });
    } else if (type === "answer") {
      voteAnswer({
        answerId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        hasdownVoted: voteType === "downvote",
        hasupVoted: voteType === "upvote",
        path: pathname,
      });
      // todo: show a toast
    }
  };
  const handleSave = async () => {
    if (!userId) return;
    await saveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });
  };
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")} // upvote
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900 ">
              {bigNumberToString(upvotes || 0)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")} // downvote
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900 ">
              {bigNumberToString(downvotes || 0)}
            </p>
          </div>
        </div>
      </div>
      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="star"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => handleSave()} // save
        />
      )}
    </div>
  );
};

export default Votes;
