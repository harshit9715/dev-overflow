import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Welcome to your new Clerk app!</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
