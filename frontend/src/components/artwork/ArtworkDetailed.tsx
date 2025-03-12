import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHarvardArtById } from "../../api-calls/harvardart/harvardart-calls";
import { getClevelandArtById } from "../../api-calls/clevelandart/clevelandart-calls";
import { LoaderIcon } from "lucide-react";

export const ArtworkDetailed = () => {
  let { gallery, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gallery || !id) {
      navigate("/");
    }
  }, [gallery, id, navigate]);

  const harvardQueryEnabled = gallery === "harvard" && id !== undefined;
  const clevelandQueryEnabled = gallery === "cleveland" && id !== undefined;

  const {
    data: harvardArt,
    isLoading: harvardLoad,
    error: harvardError,
  } = useQuery({
    queryKey: ["harvardArt", id],
    queryFn: () => getHarvardArtById(Number(id)),
    enabled: harvardQueryEnabled,
  });

  const {
    data: clevelandArt,
    isLoading: clevelandLoad,
    error: clevelandError,
  } = useQuery({
    queryKey: ["clevelandArt", id],
    queryFn: () => getClevelandArtById(Number(id)),
    enabled: clevelandQueryEnabled,
  });

  return (
    <div>
      {(harvardLoad || clevelandLoad) && (
        <div className="flex justify-center mt-4">
          <LoaderIcon className="animate-spin self-center size-8" />
        </div>
      )}
      {(harvardError || clevelandError) && (
        <h1 className="mt-4">Error fetching Artwork</h1>
      )}
      <h1>Artwork Detailed</h1>
      <h1>{gallery}</h1>
      <h1>{id}</h1>
      {gallery === "harvard" && harvardArt && <h1>{harvardArt?.data.title}</h1>}
      {gallery === "cleveland" && clevelandArt && (
        <h1>{clevelandArt?.data.data.title}</h1>
      )}
    </div>
  );
};
