"use client";

import React from "react";
import { LeafletMapProps } from "@/interfaces/leafletMap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap: React.FC<LeafletMapProps> = ({
  lat,
  long,
  adress,
  postCode,
  city,
  className,
}) => {
  const position: [number, number] = [lat ?? 0, long ?? 0];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className={`h-[500px] w-full ${className}`}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>
          {adress}
          <br />
          {postCode} {city}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
