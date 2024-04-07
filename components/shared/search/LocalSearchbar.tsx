"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearch = ({
  iconPosition,
  imgSrc,
  otherClasses,
  placeholder,
  route,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();

  const query = searchParam.get("q") || "";

  const [search, setSearch] = useState(query);

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
  }, [search, route, pathname, searchParam, query]);
  return (
    <div
      className={`background-light800_dark300 text-dark400_light700 flex min-h-[56px] grow items-center gap-4 rounded-xl px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search icon"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="background-light800_dark300 paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search icon"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
