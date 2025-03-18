import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface ApiErrorProps {
  message?: string;
  details?: string;
  onRetry?: () => void;
  className?: string;
}

export const HomepageApiError: React.FC<ApiErrorProps> = ({
  message = "Error Fetching Data",
  details = null,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div className="bg-dbg-purple dark:bg-lbg-purple rounded-full p-4">
        <AlertTriangle size={64} className="text-red-500 w-16 h-16" />
      </div>
      <div className="text-2xl text-dbg-purple dark:text-lbg-purple">
        {message}
      </div>
      <div className="text-lg text-dbg-purple dark:text-lbg-purple">
        {details}
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="text-lbuttonbg-white hover:bg-dbuttonbg-pink hover:text-dbuttontext-dark bg-dbg-purple dark:bg-dbuttonbg-pink dark:hover:bg-lbg-purple dark:text-dbuttontext-dark cursor-pointer ml-2"
        >
          <RefreshCw size={16} className="inline-block mr-2" />
          Retry
        </Button>
      )}
    </div>
  );
};

export const HomepageNoResultsError: React.FC<{
  query?: string;
  className?: string;
}> = ({ query = "", className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div className="bg-dbg-purple dark:bg-dbuttonbg-pink rounded-full p-4">
        <AlertTriangle size={64} className="text-red-500 w-16 h-16" />
      </div>
      <h3 className="text-2xl text-dbg-purple dark:text-dbuttonbg-pink">
        No Artworks Found
      </h3>
      {query && (
        <p className="text-lg text-dbg-purple dark:text-dbuttonbg-pink mt-2">
          No results match your search "{query}". Try adjusting your search
          terms.
        </p>
      )}
      {!query && (
        <p className="text-lg text-dbg-purple dark:text-dbuttonbg-pink mt-2">
          No artworks are available in this gallery section.
        </p>
      )}
    </div>
  );
};

export const GeneralError: React.FC<{
  mainMessage: string;
  message?: string;
  className?: string;
}> = ({ mainMessage = "", message = "", className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div className="bg-dbg-purple dark:bg-dbuttonbg-pink rounded-full p-4">
        <AlertTriangle size={64} className="text-red-500 w-16 h-16" />
      </div>
      <h3 className="text-2xl text-dbg-purple dark:text-dbuttonbg-pink">
        {mainMessage}
      </h3>
      {message && (
        <p className="text-lg text-dbg-purple dark:text-dbuttonbg-pink mt-2">
          {message}
        </p>
      )}
      {!message && (
        <p className="text-lg text-dbg-purple dark:text-dbuttonbg-pink mt-2">
          There has been an error, please try again.
        </p>
      )}
    </div>
  );
};
