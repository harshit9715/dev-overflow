"use client";

import { globalSearch } from "@/lib/actions/general.action";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalFilters from "./GlobalFilters";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    {
      type: "question",
      id: "1",
      title: "How to use React?",
    },
    {
      type: "tag",
      id: "2",
      title: "NextJs",
    },
    {
      type: "user",
      id: "3",
      title: "John Doe",
    },
    {
      type: "answer",
      id: "4",
      title: "React is a JavaScript library for building user interfaces",
    },
  ]);
  const global = searchParams.get("g") || "";
  const type = searchParams.get("type") || "";

  useEffect(() => {
    const fetchResults = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        // call database to fetch everything
        const res = await globalSearch({
          query: global,
          type,
        });
        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/questions/${id}`;
      case "tag":
        return `/tags/${id}`;
      case "user":
        return `/profile/${id}`;
      case "answer":
        return `/questions/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-8 shadow-sm dark:bg-dark-400">
      <GlobalFilters />
      <div className="my-5 h-1 bg-light-700/50 dark:bg-dark-500/50"></div>
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular">
              Browsing the whole database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((result: any, index: number) => (
                <Link
                  href={renderLink(result.type, result.id)}
                  key={result.type + result.id + index}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                >
                  <Image
                    src={"/assets/icons/tag.svg"}
                    width={18}
                    height={18}
                    alt="tag"
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col ">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {result.title}
                    </p>
                    <p className="text-light400_light500 small-medium mt-1 font-bold capitalize">
                      {result.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, no result found!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
