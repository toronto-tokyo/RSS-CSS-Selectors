import "./assets/cheese-slice.svg";

const IMAGE_LINK = "./assets/cheese-slice.svg";

const CUSTOM_TAG_NAME = "cheese-slice";

const CSS_STYLES = {
  background: `url(${IMAGE_LINK}) 50%/contain no-repeat`,
  width: "80px",
  height: "70px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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
    this.style.background = CSS_STYLES.background;
    this.style.width = CSS_STYLES.width;
    this.style.height = CSS_STYLES.height;
    this.style.display = CSS_STYLES.display;
    this.style.alignItems = CSS_STYLES.alignItems;
    this.style.justifyContent = CSS_STYLES.justifyContent;
    if (elementClass) {
      this.className = elementClass;
    }
    if (elementId) {
      this.id = elementId;
    }
  }
}

customElements.define(CUSTOM_TAG_NAME, CheeseView);
