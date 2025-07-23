"use client";

import { LeafletMapProps } from "@/interfaces/leafletMap";
import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/layout/LeafletMap"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function LeafletContainer({lat, long, adress, postCode, city}: LeafletMapProps) {
  return <LazyMap lat={lat} long={long} adress={adress} postCode={postCode} city={city} />;
}