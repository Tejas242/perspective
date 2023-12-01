import Masonry from "react-masonry-css";
import ArtworkComponent from "./ArtworkComponent";
import "./MesonryGrid.css"

interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  image_id: string;
  description: string;
}

interface MasonryGridProps {
  artworks: Artwork[];
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const MasonryGrid: React.FC<MasonryGridProps> = ({ artworks }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {artworks.map((artwork) => (
        <ArtworkComponent key={artwork.id} artwork={artwork} />
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
