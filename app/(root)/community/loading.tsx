import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearchbar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserFilters } from "@/constants/filters";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses=" min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4 py-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
          <div
            key={id}
            className="shadow-light100_darknone light-border flex flex-col  items-center rounded-2xl py-8"
          >
            <div className="background-light900_dark200 flex w-full flex-col items-center justify-center max-xs:min-w-full xs:w-[260px]">
              <Skeleton className="size-[100px] rounded-full" />
              <div className="mt-4 flex flex-col items-center">
                <h3 className="h3-bold text-dark200_light900 line-clamp-1">
                  <Skeleton className="h-6 w-40" />
                </h3>
                <Skeleton className="body-regular text-dark500_light700 mt-2 h-5 w-20" />
              </div>
              <div className="mt-5 flex gap-4">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Loading;
