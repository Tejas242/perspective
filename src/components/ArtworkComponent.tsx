
interface Artwork {
  // Define the structure of your artwork data
  // You can check the API response to get accurate types
  id: number;
  title: string;
  artist_display: string;
  image_id: string;
  description: string;
  // Add other properties as needed
}

interface ArtworkProps {
  artwork: Artwork;
}

const ArtworkComponent: React.FC<ArtworkProps> = ({ artwork }) => {
  const imageSrc = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

  return (
    <div>
      <img
        className="w-full h-full mb-4"
        src={imageSrc}
        alt={artwork.title}
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/400x600/png"; // Replace with your fallback image
        }}
      />
      <div>
        <h2 className="text-xl font-semibold mb-2">{artwork.title}</h2>
        <p className="text-gray-600 mb-2">Artist: {artwork.artist_display}</p>
      </div>
    </div>
  );
};

export default ArtworkComponent;
