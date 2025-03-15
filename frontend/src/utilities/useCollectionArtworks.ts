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
  console.log(collectionId, page);
  const fetchArtworks = async () => {
    try {
      const artworks = await fetchArtworksByCollectionId(
        Number(collectionId),
        Number(page)
      );
      console.log(artworks);
      const pagination = artworks.data.pagination;
      const processedArtworks: ProcessedArtwork[] = await Promise.all(
        artworks.data.data.map(async (artwork: CollectionArtwork) => {
          if (artwork.gallery === "harvard") {
            try {
              const artworkData = await getHarvardArtById(
                Number(artwork.artwork_id)
              );
              return { gallery: artwork.gallery, data: artworkData };
            } catch (error) {
              console.log(error);
              return null;
            }
          } else if (artwork.gallery === "cleveland") {
            try {
              const artworkData = await getClevelandArtById(
                Number(artwork.artwork_id)
              );
              return { gallery: artwork.gallery, data: artworkData };
            } catch (error) {
              console.log(error);
              return null;
            }
          } else {
            return null;
          }
        })
      );
      return { data: processedArtworks, pagination: pagination };
    } catch (error) {
      console.error("Error fetching collection artworks:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["collectionArtworks", collectionId, page],
    queryFn: fetchArtworks,
    enabled: !!collectionId || !!page,
  });
};
