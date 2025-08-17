import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AboutUs = () => {
  const position = [23.8103, 90.4125]; 

  return (
    <div className="p-4">d
      <h2 className="text-2xl font-bold mb-4">📍 Our Location</h2>
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%", zIndex: 10 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>We are here! </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default AboutUs;
