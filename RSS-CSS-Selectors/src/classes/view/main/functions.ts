export function clearWrapperElement(wrapperElement: HTMLElement): void {
  while (wrapperElement?.firstElementChild) {
    wrapperElement.firstElementChild.remove();
  }
}
