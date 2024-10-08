import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";

const Tags = async ({ searchParams }: URLProps) => {
  const { tags, isNext } = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search keywords to find questions linked to them..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses=" min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap justify-center gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResult
            link="/sign-up"
            linkTitle="Sign Up"
            description="Popular tags will be shown here. 🚀"
            title="No tags found"
          />
        )}
      </section>
      <div className="mt-12">
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default Tags;
