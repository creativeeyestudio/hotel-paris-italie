"use client";

import React from "react";
import { LeafletMapProps } from "@/interfaces/leafletMap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LeafletMap: React.FC<LeafletMapProps> = ({
  location,
  adress,
  postCode,
  city,
  className,
}) => {

  const position: [number, number] = [location?.[0] ?? 0, location?.[1] ?? 0];
  const icon = new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png' });

  return (
    <MapContainer
      center={position}
      zoom={17}
      scrollWheelZoom={false}
      className={`h-[500px] w-full ${className}`}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          {adress}<br />
          {postCode} {city}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
