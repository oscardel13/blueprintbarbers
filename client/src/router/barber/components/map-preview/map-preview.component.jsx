import { useMemo, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const prettyPrecision = (p) => {
  if (!p) return "";
  const map = {
    rooftop: "Rooftop",
    street: "Street",
    address: "Address",
    neighborhood: "Neighborhood",
    locality: "Locality",
    place: "Place",
    region: "Region",
    country: "Country",
  };
  return map[p] || p.charAt(0).toUpperCase() + p.slice(1);
};

const formatUpdated = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const MapPreview = ({ address }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const coords = address?.location?.coordinates;
  const precision = address?.geocode?.precision;
  const provider = address?.geocode?.provider;
  const geocodedAt = address?.geocode?.geocodedAt;

  const accuracyLabel = useMemo(() => prettyPrecision(precision), [precision]);
  const updatedLabel = useMemo(() => formatUpdated(geocodedAt), [geocodedAt]);

  if (!coords || coords.length !== 2) {
    return <div className="text-sm text-gray-600">Location not available</div>;
  }

  const [lng, lat] = coords;

  return (
    <div className="space-y-2">
      <div
        onClick={() => setIsExpanded((p) => !p)}
        className="relative cursor-pointer overflow-hidden rounded-xl border"
      >
        <Map
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: isExpanded ? 14 : 11,
          }}
          style={{ width: "100%", height: "150px" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <Marker longitude={lng} latitude={lat} color="red" />
        </Map>
      </div>

      {(accuracyLabel || updatedLabel) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {accuracyLabel ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800 font-semibold">
              Accuracy: {accuracyLabel}
            </span>
          ) : null}

          {provider ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              Provider: {provider}
            </span>
          ) : null}

          {updatedLabel ? (
            <span className="text-gray-500">Updated {updatedLabel}</span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MapPreview;
