import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const PageControls = ({
  previous,
  next,
  setCurrentGallery,
  currentPage,
}: {
  previous: () => void;
  next: () => void;
  setCurrentGallery: (gallery: string) => void;
  currentPage: number;
}) => {
  return (
    <div className="flex flex-row justify-between w-full">
      <div>
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
      <div className="space-x-2">
        <Button
          onClick={previous}
          disabled={currentPage === 1}
          className="hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
        >
          Previous
        </Button>
        <Button
          onClick={next}
          className="hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
