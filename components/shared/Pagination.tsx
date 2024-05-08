"use client";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  pageNumber?: number;
  isNext?: string | null;
  scrollToTop?: boolean;
}

const Pagination = ({
  pageNumber = 1,
  isNext = undefined,
  scrollToTop = true,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavination = (direction: string) => {
    const nextPageNumber =
      direction === "next" ? pageNumber + 1 : pageNumber - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl, { scroll: scrollToTop });
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavination("prev")}
        className="light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2"
      >
        <p className="body-regular text-dark500_light700">Prev</p>
      </Button>
      <div className="bg-primary-500 flex justify-center items-center rounded-md px-3.5 py-2">
        <p className="body-semibold text-dark500_light700">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavination("next")}
        className="light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2"
      >
        <p className="body-regular text-dark500_light700">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
