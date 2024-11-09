import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapPreview = ({ address }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Function to fetch latitude and longitude from address
  const fetchCoordinates = async (address) => {
    const encodedAddress = encodeURIComponent(address); // Encode the address for URL
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;
    console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const { center } = data.features[0]; // Extract latitude and longitude
        setCoordinates({
          latitude: center[1],
          longitude: center[0],
        });
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // Fetch coordinates when the address changes
  useEffect(() => {
    if (address) {
      fetchCoordinates(address);
    }
  }, [address]);

  if (!coordinates) return <div>Loading...</div>; // Show loading while fetching coordinates

  return (
    <div onClick={handleExpand} className="relative cursor-pointer">
      <Map
        initialViewState={{
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          zoom: isExpanded ? 14 : 11,
        }}
        style={{
          width: "100%",
          height: "150px",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        interactive={isExpanded}
      >
        <Marker
          longitude={coordinates.longitude}
          latitude={coordinates.latitude}
          color="red"
        />
      </Map>
    </div>
  );
};

export default MapPreview;
