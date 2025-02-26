import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
        <Popover>
          <PopoverTrigger asChild>
            <Button className="hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer">
              Change Art Gallery
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-dbg-purple dark:bg-dbuttonbg-pink">
            <div className="flex flex-col items-center space-y-2">
              <Label
                className="text-base text-lbuttonbg-white dark:text-dbuttontext-dark hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:hover:bg-dbg-purple dark:hover:text-dheadline-white cursor-pointer"
                onClick={() => setCurrentGallery("harvard")}
              >
                Harvard Art Museum
              </Label>
              <Label
                className="text-base text-lbuttonbg-white dark:text-dbuttontext-dark hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:hover:bg-dbg-purple dark:hover:text-dheadline-white cursor-pointer"
                onClick={() => setCurrentGallery("cleveland")}
              >
                Cleveland Museum of Art
              </Label>
            </div>
          </PopoverContent>
        </Popover>
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
