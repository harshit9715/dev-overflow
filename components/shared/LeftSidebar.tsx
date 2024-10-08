"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <div key={link.route} className="">
              <Link
                key={link.route}
                href={link.route}
                className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  className={`${isActive ? "" : "invert-colors"}`}
                  src={link.imgURL}
                  width={20}
                  height={20}
                  alt={link.label}
                />
                <p
                  className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
                >
                  {link.label}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href={"/sign-in"}>
              <Button className="small-medium btn-secondary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src={"/assets/icons/account.svg"}
                  width={20}
                  height={20}
                  alt="Log In"
                  className="max-lg:invert-colors lg:hidden"
                />
                <p className={"primary-text-gradient max-lg:hidden"}>Log In</p>
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                <Image
                  src={"/assets/icons/sign-up.svg"}
                  width={20}
                  height={20}
                  alt="Sign up"
                  className="max-lg:invert-colors lg:hidden"
                />
                <p className={"max-lg:hidden"}>Sign up</p>
              </Button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex w-full items-center justify-start gap-4 bg-transparent">
            <SignOutButton>
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border p-3 shadow-none">
                <Image
                  src={"/assets/icons/logout.svg"}
                  width={20}
                  height={20}
                  alt="Logout"
                  className="lg:hidden"
                />
                <p className={"max-lg:hidden"}>Logout</p>
              </Button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
