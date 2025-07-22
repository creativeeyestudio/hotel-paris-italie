export default function toggleReservePopup(): void {
    const popup: Element | null = document.querySelector('.reserve-popup');
    if (!popup) return;

    const isOpen: boolean = popup.classList.contains('reserve-popup--open');
    popup.classList.toggle('reserve-popup--open', !isOpen);
    popup.classList.toggle('reserve-popup--close', isOpen);
}