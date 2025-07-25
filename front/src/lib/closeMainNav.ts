export default function closeMainNav(): void {
  const mainNav: Element | null = document.querySelector(".nav");
  if (!mainNav) return;

  const isOpen: boolean = mainNav.classList.contains("nav--open");
  mainNav.classList.toggle("nav--close", isOpen);
}