import { usePathname } from "next/navigation";

export function useShouldNavigateTo() {
  const pathname = usePathname();

  return (href: string): boolean => {
    // Nettoie les deux URLs (en supprimant les slashs finaux)
    const normalize = (url: string) => url.replace(/\/+$/, "") || "/";
    return normalize(href) !== normalize(pathname);
  };
}
