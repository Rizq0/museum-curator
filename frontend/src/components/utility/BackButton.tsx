import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-start w-full">
      <Button
        className="bg-dbg-purple text-dheadline-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark border-0 cursor-pointer mt-4"
        onClick={handleBack}
      >
        BACK
      </Button>
    </div>
  );
};
