import { ITag } from "@/lib/database/tag.model";
import Link from "next/link";

interface TagCardProps {
  tag: ITag;
}

const TagCard = async ({ tag }: TagCardProps) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone h-[220px] w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex size-full flex-col items-center justify-center rounded-2xl border px-8 py-10">
        <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
        </div>
        <p className="small-medium text-dark300_light900 line-clamp-6 py-2">
          {tag.description}
        </p>
        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {tag.questions.length}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
