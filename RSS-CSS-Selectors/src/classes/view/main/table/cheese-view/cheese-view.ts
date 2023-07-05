import "./assets/cheese-slice.svg";

const imageLink = "./assets/cheese-slice.svg";

export class CheeseView extends HTMLElement {
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
    this.style.width = "80px";
    this.style.height = "70px";
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

customElements.define("cheese-slice", CheeseView);
