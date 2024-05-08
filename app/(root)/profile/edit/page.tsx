import ProfileForm from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

const EditProfile = async ({ params }: ParamsProps) => {
  const { sessionClaims } = auth();

  if (!sessionClaims?.userId) return null;
  const user = await getUserById({
    userId: sessionClaims.userId as string,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <ProfileForm userObjString={JSON.stringify(user)} />
      </div>
    </>
  );
};

export default EditProfile;
