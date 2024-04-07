import AnswerTab from "@/components/shared/AnswerTab";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import RenderTag from "@/components/shared/RenderTag";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTagByUserId } from "@/lib/actions/tag.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { formattedDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Profile = async ({ params: { id }, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const mongoUser = await getUserById({ userId: id });
  const { tags } = await getTagByUserId({ userId: mongoUser._id });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={mongoUser.picture!}
            alt="user"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-semibold text-dark100_light900">
              {mongoUser.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{mongoUser.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {mongoUser.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  title={mongoUser.portfolioWebsite}
                  href={mongoUser.portfolioWebsite}
                />
              )}

              {mongoUser.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={mongoUser.location}
                />
              )}
              {mongoUser.joinedAt && (
                <ProfileLink
                  imgUrl="/assets/icons/calendar.svg"
                  title={formattedDate(mongoUser.joinedAt)}
                />
              )}
            </div>
            {mongoUser.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {mongoUser.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === mongoUser.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <div className="">
        <h2 className="h2-semibold text-dark100_light900 mt-10">
          Stats: {mongoUser.reputation}
        </h2>
        <Stats userId={mongoUser._id!} />
      </div>
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger
              // className="shadow-lg enabled:bg-primary-100 :text-primary-500"
              value="top-posts"
              className="tab"
            >
              Top Posts
            </TabsTrigger>
            <TabsTrigger
              // className="shadow-lg enabled:bg-primary-100 enabled:text-primary-500"
              value="answers"
              className="tab"
            >
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <div className="flex">
              <QuestionTab
                searchParams={searchParams}
                userId={mongoUser._id}
                clerkId={clerkId!}
              />
            </div>
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab
              userId={mongoUser._id}
              clerkId={clerkId!}
              searchParams={searchParams}
            />
          </TabsContent>
        </Tabs>
        <div className="hidden flex-1 flex-col max-lg:hidden">
          <h3 className="h3-semibold text-dark100_light900 mb-4">Top Tags</h3>
          {tags.length &&
            tags.map((tag) => (
              <div key={tag._id} className="py-2">
                <RenderTag
                  _id={tag._id}
                  name={tag.name}
                  showCount
                  totalQuestions={tag.questions.length}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
