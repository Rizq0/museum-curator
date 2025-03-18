import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { LoaderIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "../../api-calls/backend/backend-calls";
import { useState, useEffect } from "react";
import { PaginationOnly } from "../utility/PaginationOnly";
import { DeleteCollection } from "./DeleteCollection";
import { EditCollection } from "./EditCollection";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../utility/BackButton";
import { CreateCollection } from "./CreateCollection";
import { RetryError } from "../error/Errors";

export const CollectionHome = () => {
  const basename = import.meta.env.DEV ? "" : "/museum-curator";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["collections", currentPage],
    queryFn: () => fetchCollections(currentPage),
  });

  useEffect(() => {
    const pagination = data?.data?.pagination;

    if (pagination) {
      const current = Number(pagination.current_page) || 1;
      const total = Number(pagination.total_pages) || 1;
      setCurrentPage(current);
      setTotalPages(total);
    }
  }, [data]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="flex flex-col items-center w-full">
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoaderIcon className="animate-spin self-center size-8" />
        </div>
      )}
      {!isLoading && data && (
        <div className="flex justify-between w-full mt-4">
          <BackButton />
          <PaginationOnly
            previous={handlePreviousPage}
            next={handleNextPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
      {isError && (
        <RetryError
          message="Error Loading Collections"
          details="Unable to fetch your collections at this time."
          onRetry={() => refetch()}
          className="mt-16 mb-16"
        />
      )}
      {data && (
        <>
          <div className="w-full max-w-[650px] mx-auto">
            <Table className="mt-4">
              <TableHeader>
                <TableRow className="dark:bg-dbuttonbg-pink bg-dbg-purple dark:hover:bg-dbuttonbg-pink  hover:bg-dbg-purple">
                  <TableHead className="w-[100px] text-dheadline-white font-bold text-lg  dark:text-dbg-purple">
                    User
                  </TableHead>
                  <TableHead className="text-dheadline-white font-bold text-lg dark:text-dbg-purple">
                    Collection Name
                  </TableHead>
                  <TableHead className="text-dheadline-white font-bold text-lg dark:text-dbg-purple">
                    Created
                  </TableHead>
                  <TableHead className="text-dheadline-white font-bold text-lg dark:text-dbg-purple"></TableHead>
                  <TableHead className="text-dheadline-white font-bold text-lg dark:text-dbg-purple"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.data.map((collection: any) => (
                  <TableRow
                    className="hover:bg-lbg-purple dark:hover:bg-dbg-purple font-bold"
                    key={collection.id}
                  >
                    <TableCell>{collection.user_id}</TableCell>
                    <TableCell
                      className="cursor-pointer dark:hover:bg-lbg-purple dark:hover:text-dbg-purple hover:bg-dbuttonbg-pink"
                      onClick={() =>
                        navigate(`${basename}/collection/${collection.id}`)
                      }
                    >
                      {collection.name}
                    </TableCell>
                    <TableCell>
                      {new Date(collection.createdAt)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "-")}
                    </TableCell>
                    <TableCell className="cursor-pointer dark:hover:bg-lbg-purple dark:hover:text-dbg-purple hover:bg-dbuttonbg-pink">
                      <div className="flex justify-center">
                        <EditCollection
                          collectionId={collection.id}
                          currentName={collection.name}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="cursor-pointer dark:hover:bg-lbg-purple dark:hover:text-dbg-purple hover:bg-dbuttonbg-pink">
                      <div className="flex justify-center">
                        <DeleteCollection collectionId={collection.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
              <CreateCollection />
            </div>
          </div>

          {!isLoading && data && (
            <div className="flex justify-between w-full mt-4">
              <BackButton />
              <PaginationOnly
                previous={handlePreviousPage}
                next={handleNextPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
