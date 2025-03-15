import { useQuery } from "@tanstack/react-query";
import { getHarvardArtById } from "../api-calls/harvardart/harvardart-calls";
import { getClevelandArtById } from "../api-calls/clevelandart/clevelandart-calls";
import { fetchArtworksByCollectionId } from "../api-calls/backend/backend-calls";

export interface CollectionArtwork {
  id: number;
  artwork_id: number | string;
  gallery: string;
  favourite_list_id: number;
}

export interface ProcessedArtwork {
  gallery: string;
  data: any;
}

export const useCollectionArtworks = (
  collectionId: string | number,
  page: number
) => {
  const fetchArtworks = async () => {
    try {
      const artworks = await fetchArtworksByCollectionId(
        Number(collectionId),
        Number(page)
      );
      const pagination = artworks.data.pagination;

      const harvardArtworks = artworks.data.data.filter(
        (artwork: CollectionArtwork) => artwork.gallery === "harvard"
      );

      const harvardArtworkProcessed = await Promise.all(
        harvardArtworks.map(async (artwork: CollectionArtwork) => {
          try {
            const artworkData = await getHarvardArtById(
              Number(artwork.artwork_id)
            );
            return { gallery: artwork.gallery, data: artworkData };
          } catch (error) {
            console.log(error);
            return null;
          }
        })
      );

      const clevelandArtworks = artworks.data.data.filter(
        (artwork: CollectionArtwork) => artwork.gallery === "cleveland"
      );

      const clevelandResults = [];
      for (const artwork of clevelandArtworks) {
        try {
          const artworkData = await getClevelandArtById(
            Number(artwork.artwork_id)
          );
          clevelandResults.push({
            gallery: artwork.gallery,
            data: artworkData,
          });
        } catch (error) {
          console.log(error);
          return null;
        }
      }

      const processedArtworks = [
        ...harvardArtworkProcessed,
        ...clevelandResults,
      ];
      return { data: processedArtworks, pagination };
    } catch (error) {
      console.error("Error fetching collection artworks:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["collectionArtworks", collectionId, page],
    queryFn: fetchArtworks,
    enabled: !!collectionId && !!page,
    staleTime: 0,
    gcTime: 0,
  });
};
