export default function closeMainNav(): void {
  const mainNav: Element | null = document.querySelector(".nav");
  if (!mainNav) return;

  const isOpen: boolean = mainNav.classList.contains("nav--open");
  if (!isOpen) return;

  const toggleNavBtn = document.querySelector('#toggle-nav-btn') as HTMLElement;
  toggleNavBtn?.click();
}