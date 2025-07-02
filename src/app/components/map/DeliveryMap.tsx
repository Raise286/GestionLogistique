// components/map/DeliveryMap.tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { Delivery } from '@/lib/types';

// Pour corriger un bug commun avec les icônes par défaut dans Webpack/Next.js
const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface DeliveryMapProps {
  deliveries: Delivery[];
  center: LatLngExpression;
  zoom?: number;
}

const DeliveryMap = ({ deliveries, center, zoom = 12 }: DeliveryMapProps) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full rounded-lg">
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {deliveries.map((delivery) => (
        <Marker key={delivery.id} position={delivery.origin} icon={defaultIcon}>
          <Popup>
            <b>Livraison #{delivery.id}</b><br/>
            De: {delivery.originAddress}<br/>
            À: {delivery.destinationAddress}<br/>
            <button className="w-full mt-2 bg-blue-500 text-white text-sm py-1 px-2 rounded hover:bg-blue-600">
              Voir détails
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DeliveryMap;