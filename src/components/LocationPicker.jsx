import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      searchLabel: '🔍 Search location...',
      autoComplete: true,
      autoCompleteDelay: 300,
      showMarker: false,
      showPopup: false,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    // ✨ Fix search bar and dropdown styles
    setTimeout(() => {
      const input = document.querySelector('.leaflet-control-geosearch input');
      const results = document.querySelector('.leaflet-control-geosearch .results');

      if (input) {
        input.style.color = '#000';
        input.style.backgroundColor = '#fff';
        input.style.border = '1px solid #ccc';
        input.style.zIndex = '10000';
      }

      if (results) {
        results.style.backgroundColor = '#fff';
        results.style.color = '#000';
        results.style.border = '1px solid #ccc';
        results.style.maxHeight = '200px';
        results.style.overflowY = 'auto';
        results.style.zIndex = '10000';

        const items = document.querySelectorAll('.leaflet-control-geosearch .results > *');
        items.forEach((item) => {
          item.style.color = '#000';
          item.style.backgroundColor = '#fff';
          item.style.padding = '8px 10px';
          item.style.borderBottom = '1px solid #ddd';
          item.style.cursor = 'pointer';
        });
      }
    }, 200);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const LocationMarker = ({ onConfirm }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useMapEvents({
    click: async (e) => {
      const coords = e.latlng;
      setPosition(coords);
      setAddress('');
      setLoading(true);

      try {
        const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=${apiKey}`
        );
        const formatted = response.data.results?.[0]?.formatted;
        setAddress(formatted || 'Unknown Location');
      } catch (err) {
        console.error('❌ Reverse geocoding failed', err);
        setAddress('❌ Failed to fetch address');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {position && (
        <>
          <Marker position={position} />
          <div className="absolute bottom-4 left-4 right-4 bg-white p-4 shadow-md rounded flex flex-col sm:flex-row justify-between items-start sm:items-center z-[999] gap-2">
            <div className="text-sm text-gray-700">
              📍 {loading ? 'Fetching address...' : address}
              <br />
              ({position.lat.toFixed(4)}, {position.lng.toFixed(4)})
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() =>
                onConfirm({
                  lat: position.lat,
                  lng: position.lng,
                  address,
                })
              }
            >
              ✅ Confirm
            </button>
          </div>
        </>
      )}
    </>
  );
};

const LocationPicker = ({ onConfirm }) => {
  return (
    <div className="relative h-[400px] rounded shadow border overflow-hidden">
      <MapContainer
        center={[28.6139, 77.209]} // Default to Delhi
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl />
        <LocationMarker onConfirm={onConfirm} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
