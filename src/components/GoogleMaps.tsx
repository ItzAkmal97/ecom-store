import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

function GoogleMaps() {
  const center = {
    lat: 32.172101887788095,
    lng: 74.18633586719635,
  };

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
  });

  const mapOptions = {
    gestureHandling: "cooperative",
  };

  if (!isLoaded) return <div>Loading...</div>;

  if (loadError) return <div>Map cannot be loaded right now</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
        mapTypeId="roadmap"
        options={mapOptions}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default GoogleMaps;
