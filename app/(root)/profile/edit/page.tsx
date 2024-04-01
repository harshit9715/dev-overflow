import ProfileForm from "@/components/forms/Profile";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

const EditProfile = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  const { question } = await getQuestionById(params.id);
  console.log(question);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <ProfileForm
          clerkId={userId}
          userObjString={JSON.stringify(mongoUser)}
        />
      </div>
    </>
  );
};

export default EditProfile;
