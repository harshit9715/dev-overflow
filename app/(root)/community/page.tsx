import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.actions";
import { URLProps } from "@/types";
import { Metadata } from "next";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Dev Overflow | Community Page",
  description: "Community page of Dev Overflow",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const Community = async ({ searchParams }: URLProps) => {
  const { users, isNext } = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20,
  });

  const loading = false;
  if (loading) return <Loading />;
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
      <section className="mt-12 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.username} user={user} />)
        ) : (
          <NoResult
            description="Be the first to join the community. 🚀"
            link="/sign-up"
            linkTitle="Sign Up"
            title="No user found"
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

export default Community;
