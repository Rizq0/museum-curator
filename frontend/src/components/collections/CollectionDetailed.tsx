import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCollectionArtworks } from "../../utilities/useCollectionArtworks";
import { LoaderIcon } from "lucide-react";
import { ArtworkCard } from "../artwork/ArtworkCard";
import { BackButton } from "../utility/BackButton";
import { PaginationOnly } from "../utility/PaginationOnly";

export const CollectionDetailed = () => {
  const { collection } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading, error } = useCollectionArtworks(
    collection || "",
    currentPage
  );

  useEffect(() => {
    const pagination = data?.pagination;

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
    <div className="flex flex-col items-center">
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoaderIcon className="animate-spin self-center size-8" />
        </div>
      )}
      {error && <h1>Error fetching collection</h1>}

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

      {data && (
        <div className="mt-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {data.data.map((art: any) => (
              <ArtworkCard
                key={art.id}
                artwork={
                  art.gallery === "cleveland"
                    ? art.data.data.data
                    : art.data.data
                }
                currentGallery={art.gallery || ""}
              />
            ))}
          </ul>
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
    </div>
  );
};
