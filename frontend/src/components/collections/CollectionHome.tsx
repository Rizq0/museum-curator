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

export const CollectionHome = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["collections", currentPage],
    queryFn: () => fetchCollections(currentPage),
  });

  useEffect(() => {
    console.log("Data structure:", data);
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
      <h1 className="text-3xl">Collections</h1>
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoaderIcon className="animate-spin self-center size-8" />
        </div>
      )}
      {isError && <h1>Error</h1>}
      {data && (
        <>
          <div className="w-full max-w-[500px] mx-auto mt-4">
            <Table className="mt-4">
              <TableHeader>
                <TableRow className="dark:bg-dbuttonbg-pink bg-dbg-purple dark:hover:bg-dbuttonbg-pink  hover:bg-dbg-purple">
                  <TableHead className="w-[100px] text-dheadline-white  dark:text-dbg-purple">
                    User
                  </TableHead>
                  <TableHead className="text-dheadline-white dark:text-dbg-purple">
                    Name
                  </TableHead>
                  <TableHead className="text-dheadline-white dark:text-dbg-purple">
                    Created
                  </TableHead>
                  <TableHead className="text-dheadline-white dark:text-dbg-purple"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.data.map((collection: any) => (
                  <TableRow
                    className="hover:bg-lbg-purple dark:hover:bg-dbg-purple"
                    key={collection.id}
                  >
                    <TableCell>{collection.user_id}</TableCell>
                    <TableCell
                      className="cursor-pointer dark:hover:bg-lbg-purple dark:hover:text-dbg-purple hover:bg-dbuttonbg-pink"
                      onClick={() => console.log(collection.id)}
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
                    <TableCell
                      className="cursor-pointer dark:hover:bg-lbg-purple dark:hover:text-dbg-purple hover:bg-dbuttonbg-pink"
                      onClick={() => console.log("handle edit")}
                    >
                      Edit
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationOnly
            previous={handlePreviousPage}
            next={handleNextPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};
