import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MyMapComponent() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    return () => {
      const mapContainer = document.querySelector('.leaflet-container');
      if (mapContainer) {
        mapContainer.remove();
      }
    };
  }, []);

  return (
    <div style={{ height: '400px' }}>
      <MapContainer
        key={key}
        center={[34.0522, -118.2437]}
        zoom={10}
        style={{ height: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
      </MapContainer>
      <button onClick={() => setKey((prevKey) => prevKey + 1)} style={{ marginTop: '10px' }}>
        Reload Map
      </button>
    </div>
  );
}

export default MyMapComponent;