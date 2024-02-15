export class CustomTagView extends HTMLElement {
  constructor(
    background: string,
    width: string,
    height: string,
    display?: string,
    alignItems?: string,
    justifyContent?: string
  ) {
    super();
    this.styleView(
      background,
      width,
      height,
      display,
      alignItems,
      justifyContent
    );
  }

  private styleView(
    background: string,
    width: string,
    height: string,
    display = "flex",
    alignItems = "center",
    justifyContent = "center"
  ): void {
    this.style.background = background;
    this.style.width = width;
    this.style.height = height;
    this.style.display = display;
    this.style.alignItems = alignItems;
    this.style.justifyContent = justifyContent;
  }
}
