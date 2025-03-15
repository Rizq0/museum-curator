import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { IconPlus } from "@tabler/icons-react";
import { createCollection } from "../../api-calls/backend/backend-calls";
import { useState } from "react";
import { Input } from "../ui/input";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const CreateCollection = () => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Collection name cannot be empty");
      return;
    }

    setIsCreating(true);

    toast.promise(
      createCollection(name, "1"), // user is hardcoded to 1 for this MVP
      {
        loading: "Creating collection...",
        success: () => {
          queryClient.invalidateQueries({ queryKey: ["collections"] });
          queryClient.invalidateQueries({ queryKey: ["collectionArtworks"] });
          setIsCreating(false);
          setOpen(false);
          return "Collection created!";
        },
        error: (error) => {
          console.error("Failed to create collection:", error);
          setIsCreating(false);
          return "Failed to create collection!";
        },
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 3000,
          icon: "🎨",
        },
        error: {
          duration: 3000,
          icon: "❌",
        },
      }
    );
  };

  return (
    <div className="cursor-pointer dark:hover:bg-lbg-purple dark:hover:text-dbg-purple hover:bg-dbuttonbg-pink">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <IconPlus height={48} width={48} />
        </PopoverTrigger>
        <PopoverContent className="w-[365px] p-4 bg-lbg-purple dark:bg-dbg-purple border-1 border-dbg-purple dark:border-dbuttonbg-pink">
          <h3 className="font-medium text-dbg-purple dark:text-lbuttonbg-white text-lg mb-2">
            Create Collection?
          </h3>
          <div className="mb-4">
            <label
              htmlFor="collection-name"
              className="block text-dbg-purple dark:text-lbuttonbg-white mb-1"
            >
              Collection Name
            </label>
            <Input
              id="collection-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Collection name"
              className="w-full bg-lbuttonbg-white dark:bg-dbg-purple dark:text-lbuttonbg-white focus:outline-none border-1 border-dbg-purple dark:border-dbuttonbg-pink"
            />
          </div>
          <div className="flex flex-row justify-end mt-4">
            <Button
              onClick={handleCreate}
              className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer mr-4"
              disabled={isCreating}
            >
              Create
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer"
              disabled={isCreating}
            >
              Cancel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
