"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const query = searchParam.get("g") || "";

  const [search, setSearch] = useState(query);
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    setIsOpen(false);
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim().length) {
        const newUrl = formUrlQuery({
          params: searchParam.toString(),
          key: "g",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        console.log("search", searchParam.toString());
        const newUrl = formUrlQuery({
          params: searchParam.toString(),
          key: "g",
          value: null,
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, router, searchParam, query]);
  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
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
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
