import "./assets/bread-slice.svg";

const imageLink = "./assets/bread-slice.svg";

export class BreadView extends HTMLElement {
  constructor(
    public elementClass: string | undefined,
    public elementId: string | undefined
  ) {
    super();
    this.configureView(elementClass, elementId);
  }

  private configureView(
    elementClass: string | undefined,
    elementId: string | undefined
  ): void {
    this.style.background = `url(${imageLink}) 50%/contain no-repeat`;
    this.style.width = "100px";
    this.style.height = "100px";
    this.style.display = "flex";
    this.style.alignItems = "center";
    this.style.justifyContent = "center";
    if (elementClass) {
      this.className = elementClass;
    }
    if (elementId) {
      this.id = elementId;
    }
  }
}

customElements.define("bread-slice", BreadView);
