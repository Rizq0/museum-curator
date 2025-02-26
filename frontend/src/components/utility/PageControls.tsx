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
} from "../ui/pagination";

export const PageControls = ({
  previous,
  next,
  setCurrentGallery,
}: {
  previous: () => void;
  next: () => void;
  setCurrentGallery: (gallery: string) => void;
  currentPage: number;
}) => {
  return (
    <div className="flex flex-row flex-wrap justify-between w-full">
      <div className="mt-4">
        <Select onValueChange={(value) => setCurrentGallery(value)}>
          <SelectTrigger className="w-[230px] cursor-pointer text-base font-semibold bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark">
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
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={previous}
                size="default"
                className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={next}
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
