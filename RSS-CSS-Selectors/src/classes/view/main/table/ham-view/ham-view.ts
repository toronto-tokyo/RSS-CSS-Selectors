import "./assets/ham-slice.svg";

const imageLink = "./assets/ham-slice.svg";

export class HamView extends HTMLElement {
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
    this.style.width = "60px";
    this.style.height = "60px";
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

customElements.define("ham-slice", HamView);
