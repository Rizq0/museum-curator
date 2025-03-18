import { FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "../ui/pagination";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const PageControls = ({
  previous,
  next,
  setCurrentGallery,
  setCurrentPage,
  totalPages,
  currentPage,
  currentGallery,
  queryString,
  setQueryString,
  handleSearch,
}: {
  previous: () => void;
  next: () => void;
  setCurrentGallery: (gallery: string) => void;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  currentPage: number;
  currentGallery: string;
  queryString: string;
  setQueryString: (query: string) => void;
  handleSearch: () => void;
}) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="flex flex-row flex-wrap md:justify-between w-full justify-center gap-2">
      <div className="mt-4 mb-4">
        <Select onValueChange={(value) => setCurrentGallery(value)}>
          <SelectTrigger className="w-[230px] cursor-pointer text-base font-semibold bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark border-0">
            <SelectValue
              placeholder={
                currentGallery === "harvard"
                  ? "Harvard Art Museum"
                  : currentGallery === "cleveland"
                  ? "Cleveland Museum of Art"
                  : currentGallery
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-dbg-purple text-dheadline-white dark:bg-dbuttonbg-pink dark:text-dbuttontext-dark">
            <SelectItem value="harvard" className="text-base font-semibold">
              Harvard Art Museum
            </SelectItem>
            <SelectItem value="cleveland" className="text-base font-semibold">
              Cleveland Museum of Art
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-row">
        <Input
          id="search"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
          placeholder="Search"
          className="w-[230px] bg-lbuttonbg-white dark:bg-dbg-purple dark:text-lbuttonbg-white focus:outline-none border-1 border-dbg-purple dark:border-dbuttonbg-pink"
        />
        <Button
          type="submit"
          className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer ml-2"
        >
          Search
        </Button>
      </form>
      <div className="mt-4">
        <Pagination className="m-w-[350px]">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={isPrevDisabled ? undefined : previous}
                size="sm"
                className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              />
            </PaginationItem>
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  className="cursor-pointer hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark"
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage > 2 && <PaginationEllipsis />}
            {prevPage && (
              <PaginationItem>
                <PaginationLink
                  size="sm"
                  onClick={() => setCurrentPage(prevPage)}
                  className="cursor-pointer hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark"
                >
                  {prevPage}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                size="sm"
                className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
                onClick={() => setCurrentPage(currentPage)}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {nextPage && (
              <PaginationItem>
                <PaginationLink
                  size="sm"
                  onClick={() => setCurrentPage(nextPage)}
                  className="cursor-pointer hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark"
                >
                  {nextPage}
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage < totalPages - 1 && <PaginationEllipsis />}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className="cursor-pointer hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={isNextDisabled ? undefined : next}
                size="sm"
                className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
