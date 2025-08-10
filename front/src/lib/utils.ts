import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function slugify(str: string): string {
  return str
    .normalize("NFD") // Décompose les accents
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Remplace tout caractère non-alphanumérique par un tiret
    .replace(/^-+|-+$/g, ""); // Supprime les tirets en début/fin
}

export function scrollToAnchor(id: string) {
  if (typeof window === "undefined") return; // Sécurité SSR

  const selector = id.startsWith("#") ? id : `#${id}`;

  const el = document.querySelector(selector) as HTMLElement | null;
  const header = document.querySelector(".header") as HTMLElement | null;

  if (el) {
    const headerHeight = header?.clientHeight ?? 0;
    const elementTop = el.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementTop - headerHeight,
      behavior: "smooth",
    });
  }
}

