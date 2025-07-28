export default function closeMainNav(): void {
  const mainNav: Element | null = document.querySelector(".nav");
  if (!mainNav) return;

  const isOpen: boolean = mainNav.classList.contains("nav--open");
  if (!isOpen) return;

  const toggleNavBtn = document.querySelector("#toggle-nav-btn") as HTMLElement;
  const toggleNavBtnMobile = document.querySelector(
    "#toggle-nav-btn-mobile",
  ) as HTMLElement;

  (window.innerWidth < 768 ? toggleNavBtnMobile : toggleNavBtn)?.click();
}
