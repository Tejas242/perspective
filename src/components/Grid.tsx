// Grid.tsx
import { useEffect, useState, useRef } from "react";
import MasonryGrid from "./MesonryGrid";

interface Artworks {
  pagination: {
    total: number;
    total_pages: number;
    current_page: number;
    prev_url: string;
    next_url: string;
  };
  data: Artwork[];
}

interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  image_id: string;
  description: string;
}

export default function Grid() {
  const [artworks, setArtworks] = useState<Artworks | null>(null);
  const [loading, setLoading] = useState(false);
  const nextPageRef = useRef<number | null>(2); // Start with page 2, as the first page is loaded initially

  const fetchNextPage = async () => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/?page=${nextPageRef.current}`
      );
      const data = await response.json();
      setArtworks((prevArtworks) => ({
        pagination: data.pagination,
        data: [...(prevArtworks?.data || []), ...data.data],
      }));
      nextPageRef.current = data.pagination.current_page + 1;
    } catch (error) {
      console.error("Error fetching artwork data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextPage(); // Load the initial data
  }, []);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && nextPageRef.current) {
      setLoading(true);
      fetchNextPage();
    }
  };

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [observer]);

  return (
    <div className="container mx-auto px-4 py-8">
      <MasonryGrid artworks={artworks?.data || []} />
      <div ref={sentinelRef}></div>
      {loading && <p>Loading...</p>}
    </div>
  );
}
