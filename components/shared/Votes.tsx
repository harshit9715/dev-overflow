"use client";
import { voteAnswer } from "@/lib/actions/answer.action";
import { viewItem } from "@/lib/actions/interaction.action";
import { voteQuestion } from "@/lib/actions/question.action";
import { saveQuestion } from "@/lib/actions/user.actions";
import { bigNumberToString } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useOptimistic, useTransition } from "react";
import { toast } from "sonner";

interface VoteProps {
  upvotes: number;
  downvotes: number;
  type: "question" | "answer";
  itemId: string;
  userId: string;
  upvoteId?: string;
  downvoteId?: string;
  saveId?: string;
}

type VoteState = {
  upvotes: number;
  hasUpvoted?: boolean;
  downvotes: number;
  hasDownVoted?: boolean;
};

const Votes = ({
  upvotes,
  downvotes,
  type,
  itemId,
  userId,
  saveId,
  downvoteId,
  upvoteId,
}: VoteProps) => {
  const pathname = usePathname();
  const router = useRouter();
  if (type === "answer") {
    // console.log(upvoteId);
  }

  // const [optimisticUpvotes, addOptimisticUpvotes] = useOptimistic(
  //   { upvotes, hasUpvoted: !!upvoteId }, // Default to 0 likes if null
  //   (state, l) => ({
  //     upvotes: state.upvotes + (state.hasUpvoted ? -1 : 1),
  //     hasUpvoted: !state.hasUpvoted,
  //   })
  // );
  const [isPending, startTransition] = useTransition();
  const [optimisticVote, newOptimisticVote] = useOptimistic(
    {
      downvotes,
      upvotes,
      hasDownVoted: !!downvoteId,
      hasUpvoted: !!upvoteId,
    },
    (state, newState: VoteState) => ({
      ...state,
      ...newState,
    })
  );

  useEffect(() => {
    if (type === "question") {
      viewItem({
        type,
        itemId,
        userId: userId ? userId : undefined,
      });
    }
  }, [itemId, userId, pathname, router, type]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) {
      toast("Please sign in", {
        description: "You need to sign in to vote",
      });
      return;
    }

    newOptimisticVote({
      upvotes:
        optimisticVote.upvotes +
        (voteType === "upvote" ? (!!upvoteId ? -1 : 1) : !!upvoteId ? -1 : 0),
      downvotes:
        optimisticVote.downvotes +
        (voteType === "downvote"
          ? !!downvoteId
            ? -1
            : 1
          : !!downvoteId
            ? -1
            : 0),
      hasUpvoted: voteType === "upvote" && !optimisticVote.hasUpvoted,
      hasDownVoted: voteType === "downvote" && !optimisticVote.hasDownVoted,
    });

    if (type === "question") {
      toast.promise(
        voteQuestion({
          questionId: itemId,
          userId: userId,
          downvoteAdded: !downvoteId && voteType === "downvote",
          upvoteAdded: !upvoteId && voteType === "upvote",
          downvoteRemoved: !!downvoteId,
          upvoteRemoved: !!upvoteId,
          upvoteRemovedId: upvoteId,
          downvoteRemovedId: downvoteId,
          path: pathname,
        }),
        {
          loading: "Voting...",
          success: `${upvoteId && voteType === "upvote" ? "Removed your upvote from the question" : downvoteId && voteType === "downvote" ? "Removed your downvote from the question" : `Added your ${voteType} to the question`}`,
          error: "Error voting",
        }
      );
    } else if (type === "answer") {
      toast.promise(
        voteAnswer({
          answerId: itemId,
          userId: userId,
          downvoteAdded: !downvoteId && voteType === "downvote",
          upvoteAdded: !upvoteId && voteType === "upvote",
          downvoteRemoved: !!downvoteId,
          upvoteRemoved: !!upvoteId,
          upvoteRemovedId: upvoteId,
          downvoteRemovedId: downvoteId,
          path: pathname,
        }),
        {
          loading: "Voting...",
          success: `${upvoteId && voteType === "upvote" ? "Removed your upvote from the answer" : downvoteId && voteType === "downvote" ? "Removed your downvote from the answer" : `Added your ${voteType} to the answer`}`,
          error: "Error voting",
        }
      );
    }
  };
  const handleSave = async () => {
    if (!userId) return;
    await saveQuestion({
      questionId: itemId,
      userId,
      saveId,
      path: pathname,
    });
    toast.info(saveId ? "Removed from saved" : "Question saved", {});
    return;
  };
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              optimisticVote.hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() =>
              !isPending && startTransition(() => handleVote("upvote"))
            } // upvote
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900 ">
              {bigNumberToString(optimisticVote.upvotes || 0)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              optimisticVote.hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="downvote"
            width={18}
            height={18}
            // lets animate fill from bottom to top on click
            className="cursor-pointer hover:transform hover:scale-125 transition-transform duration-200 ease-in-out"
            onClick={() =>
              !isPending && startTransition(() => handleVote("downvote"))
            } // upvote
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900 ">
              {bigNumberToString(optimisticVote.downvotes || 0)}
            </p>
          </div>
        </div>
      </div>
      {type === "question" && (
        <Image
          src={
            saveId
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="star"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => !isPending && startTransition(() => handleSave())}
        />
      )}
    </div>
  );
};

export default Votes;
