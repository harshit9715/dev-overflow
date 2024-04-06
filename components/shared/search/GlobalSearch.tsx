"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();

  const query = searchParam.get("q") || "";

  const [search, setSearch] = useState(query);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim().length) {
        const newUrl = formUrlQuery({
          params: searchParam.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        // router.push(route);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParam, query]);
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src={"/assets/icons/search.svg"}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
          placeholder="Search anything globally..."
          className="paragraph-regular no-focus placeholder background-light800_darkgradient text-dark400_light700 border-none shadow-none outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
