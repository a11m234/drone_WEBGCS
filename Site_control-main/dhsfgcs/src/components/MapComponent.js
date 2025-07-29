
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Update default icon path 
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://png.pngtree.com/png-clipart/20230328/original/pngtree-navigation-arrow-map-pointer-png-image_9007272.png', 
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MapComponent({ lat, lng }) {
  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '800px', width: '100%' }}>
      <TileLayer
        // Use a satellite tile layer URL
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
       
      />
      <Marker position={[lat, lng]}>
        <Popup>
          Latitude: {lat}, Longitude: {lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;