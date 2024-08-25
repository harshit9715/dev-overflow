import { getUserStats } from "@/lib/actions/user.actions";
import { bigNumberToString } from "@/lib/utils";
import Image from "next/image";

interface props {
  userId: string;
}

interface StatCardProps {
  imgUrl: string;
  value: number;
  title: string;
}
const StatsCard = ({ imgUrl, value, title }: StatCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

const Stats = async ({ userId }: props) => {
  const { totalAnswers, totalQuestions, badgeCounts } = await getUserStats({
    userId,
  });
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">
        <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {bigNumberToString(totalQuestions)}
              </p>
              <p className="body-medium text-dark400_light700">Questions</p>
            </div>
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {bigNumberToString(totalAnswers)}
              </p>
              <p className="body-medium text-dark400_light700">Answers</p>
            </div>
          </div>
          <StatsCard
            imgUrl={"/assets/icons/gold-medal.svg"}
            value={badgeCounts.GOLD}
            title="Gold Badges"
          />
          <StatsCard
            imgUrl={"/assets/icons/silver-medal.svg"}
            value={badgeCounts.SILVER}
            title="Silver Badges"
          />
          <StatsCard
            imgUrl={"/assets/icons/bronze-medal.svg"}
            value={badgeCounts.BRONZE}
            title="Bronze Badges"
          />
        </div>
      </h4>
    </div>
  );
};

export default Stats;
