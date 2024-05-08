import { UserCardFragment } from "@/lib/gql/types";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import { Badge } from "../ui/badge";

interface UserCardProps {
  user: UserCardFragment;
}

const UserCard = async ({ user }: UserCardProps) => {
  // const interactedTags = await getTopInteractedTags({ userId: user.id });
  return (
    <article className="background-light900_dark200 shadow-light100_darknone light-border flex flex-col items-center rounded-2xl py-8">
      <Link
        href={`/profile/${user.id}`}
        className="flex w-full flex-col items-center justify-center max-xs:min-w-full xs:w-[260px]"
      >
        <Image
          src={user.picture || "/assets/icons/user.svg"}
          alt="User Picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light700 mt-2">
            @{user.username}
          </p>
        </div>
      </Link>
      <div className="mt-5">
        {user.tags?.items.length ? (
          <div className="flex items-center gap-1">
            {user.tags.items.map(
              (tag) =>
                tag && <RenderTag key={tag.id} _id={tag.id} name={tag.label} />
            )}
          </div>
        ) : (
          <Badge className="body-regular text-dark500_light700">No tags</Badge>
        )}
      </div>
    </article>
  );
};

export default UserCard;
