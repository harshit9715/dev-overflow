import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.actions";

const Community = async () => {
  const { users } = await getAllUsers({});
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
    </>
  );
};

export default Community;
