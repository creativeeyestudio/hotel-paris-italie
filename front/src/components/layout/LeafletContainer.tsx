"use client";

import { LeafletMapProps } from "@/interfaces/leafletMap";
import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/layout/LeafletMap"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function LeafletContainer({
  location,
  adress,
  postCode,
  city,
  className,
}: LeafletMapProps) {
  return (
    <LazyMap
      location={location}
      adress={adress}
      postCode={postCode}
      city={city}
      className={className}
    />
  );
}
