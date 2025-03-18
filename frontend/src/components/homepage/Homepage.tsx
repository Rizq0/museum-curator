import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getHarvardArt } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArt } from "../../api-calls/clevelandart/clevelandart-calls";
import { PageControls } from "../utility/PageControls";
import { LoaderIcon } from "lucide-react";
import { ArtworkCard } from "../artwork/ArtworkCard";
import { RetryError, HomepageNoResultsError } from "../error/Errors";

export const Homepage = () => {
  let { page, gallery } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(() => Number(page) || 1);
  const [currentGallery, setCurrentGallery] = useState(() =>
    gallery === "harvard" || gallery === "cleveland" ? gallery : "cleveland"
  );
  const [totalPages, setTotalPages] = useState(0);

  const initialQuery = searchParams.get("q") || "";
  const [queryString, setQueryString] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);

  useEffect(() => {
    const newSearch = new URLSearchParams(searchParams);

    if (submittedQuery) {
      newSearch.set("q", submittedQuery);
    } else {
      newSearch.delete("q");
    }

    navigate(
      `/homepage/${currentGallery}/${currentPage}?${newSearch.toString()}`
    );
  }, [currentPage, currentGallery, submittedQuery]);

  const {
    data: harvardAll,
    isLoading: harvardLoad,
    error: harvardError,
    refetch: refetchHarvard,
  } = useQuery({
    queryKey: ["harvardArt", page, submittedQuery],
    queryFn: () => getHarvardArt(Number(page), submittedQuery),
    enabled: gallery === "harvard",
  });

  const {
    data: clevelandAll,
    isLoading: clevelandLoad,
    error: clevelandError,
    refetch: refetchCleveland,
  } = useQuery({
    queryKey: ["clevelandArt", page, submittedQuery],
    queryFn: () => getClevelandArt(Number(page), submittedQuery),
    enabled: gallery === "cleveland",
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleSearch = () => {
    setSubmittedQuery(queryString);
    setCurrentPage(1);
  };

  const handleRetry = () => {
    if (gallery === "harvard") {
      refetchHarvard();
    }
    if (gallery === "cleveland") {
      refetchCleveland();
    }
  };

  useEffect(() => {
    if (gallery === "harvard" && harvardAll) {
      const maxPages = Math.ceil(harvardAll.data.info.pages);
      setTotalPages(maxPages);

      if (currentPage > maxPages && maxPages > 0) {
        setCurrentPage(maxPages);
      }

      if (currentPage < 1) {
        setCurrentPage(1);
      }
    }

    if (gallery === "cleveland" && clevelandAll) {
      const maxPages = Math.ceil(clevelandAll.data.info.total / 15);
      setTotalPages(maxPages);

      if (currentPage > maxPages && maxPages > 0) {
        setCurrentPage(maxPages);
      }
      if (currentPage < 1) {
        setCurrentPage(1);
      }
    }
  }, [harvardAll, clevelandAll, currentPage]);

  return (
    <div className="flex flex-col items-center">
      {((gallery === "harvard" && !harvardLoad) ||
        (gallery === "cleveland" && !clevelandLoad)) && (
        <PageControls
          previous={handlePreviousPage}
          next={handleNextPage}
          setCurrentGallery={setCurrentGallery}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
          currentGallery={currentGallery || ""}
          queryString={queryString}
          setQueryString={setQueryString}
          handleSearch={handleSearch}
        />
      )}

      {(harvardLoad || clevelandLoad) && (
        <div className="flex justify-center mt-4">
          <LoaderIcon className="animate-spin self-center size-8" />
        </div>
      )}

      {(harvardError || clevelandError) && (
        <RetryError
          message="Error Fetching Data"
          details={harvardError?.message || clevelandError?.message}
          onRetry={handleRetry}
          className="mt-16 mb-16"
        />
      )}

      {gallery === "harvard" && harvardAll && (
        <div className="mt-4 mb-4">
          {harvardAll.data.records.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {harvardAll.data.records.map((art: any) => (
                <ArtworkCard
                  key={art.id}
                  artwork={art}
                  currentGallery={currentGallery || ""}
                />
              ))}
            </ul>
          ) : (
            <HomepageNoResultsError
              query={submittedQuery}
              className="mt-16 mb-16"
            />
          )}
        </div>
      )}

      {gallery === "cleveland" && clevelandAll && (
        <div className="mt-4 mb-4">
          {clevelandAll.data.data.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {clevelandAll.data.data.map((art: any) => (
                <ArtworkCard
                  key={art.id}
                  artwork={art}
                  currentGallery={currentGallery || ""}
                />
              ))}
            </ul>
          ) : (
            <HomepageNoResultsError
              query={submittedQuery}
              className="mt-16 mb-16"
            />
          )}
        </div>
      )}
      {((gallery === "harvard" && !harvardLoad) ||
        (gallery === "cleveland" && !clevelandLoad)) && (
        <PageControls
          previous={handlePreviousPage}
          next={handleNextPage}
          setCurrentGallery={setCurrentGallery}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
          currentGallery={currentGallery || ""}
          queryString={queryString}
          setQueryString={setQueryString}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
