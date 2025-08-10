// ScrollButton.tsx (Client Component)
'use client';

import { scrollToAnchor } from "@/lib/utils";

export default function ScrollButton({ targetId, btnLabel, className }: { targetId: string, btnLabel: string, className?: string }) {
  return (
    <button onClick={() => scrollToAnchor(targetId)} className={className}>
      {btnLabel}
    </button>
  );
}
