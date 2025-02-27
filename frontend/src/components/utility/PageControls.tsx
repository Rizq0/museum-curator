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
} from "../ui/pagination";

export const PageControls = ({
  previous,
  next,
  setCurrentGallery,
  setCurrentPage,
  totalPages,
  currentPage,
}: {
  previous: () => void;
  next: () => void;
  setCurrentGallery: (gallery: string) => void;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  currentPage: number;
}) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="flex flex-row flex-wrap sm:justify-between w-full justify-center">
      <div className="mt-4">
        <Select onValueChange={(value) => setCurrentGallery(value)}>
          <SelectTrigger className="w-[230px] cursor-pointer text-base font-semibold bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark border-0">
            <SelectValue placeholder="Change Art Gallery" />
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
      <div className="mt-4 ml-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={isPrevDisabled ? undefined : previous}
                size="default"
                className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              />
            </PaginationItem>
            {prevPage && (
              <PaginationItem>
                <PaginationLink
                  size="default"
                  onClick={() => setCurrentPage(prevPage)}
                  className="cursor-pointer hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark"
                >
                  {prevPage}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                size="default"
                className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
                onClick={() => setCurrentPage(currentPage)}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {nextPage && (
              <PaginationItem>
                <PaginationLink
                  size="default"
                  onClick={() => setCurrentPage(nextPage)}
                  className="cursor-pointer hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark"
                >
                  {nextPage}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={isNextDisabled ? undefined : next}
                size="default"
                className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
