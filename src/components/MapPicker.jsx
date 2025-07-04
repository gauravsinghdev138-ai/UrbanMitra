// src/components/MapPicker.jsx
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationSelector = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const MapPicker = ({ onClose, onPick, selectedLocation }) => {
  const [marker, setMarker] = useState(selectedLocation || null);

  const handleSelect = (latlng) => {
    setMarker(latlng);
    onPick(latlng);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[90%] max-w-2xl shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-red-500 text-lg font-bold"
          onClick={onClose}
        >
          ❌
        </button>
        <h2 className="text-xl font-bold mb-3 text-center">Select Location</h2>
        <MapContainer
          center={[26.8467, 80.9462]} // Lucknow default
          zoom={13}
          className="h-80 w-full rounded"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationSelector onSelect={handleSelect} />
          {marker && <Marker position={marker} icon={customIcon} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPicker;
