import { CustomTagView } from "@custom-tags-view/custom-tag-view";
import "./assets/cheese-slice.svg";

const IMAGE_LINK = "./assets/cheese-slice.svg";

const CUSTOM_TAG_NAME = "cheese-slice";

const CSS_STYLES = {
  background: `url(${IMAGE_LINK}) 50%/contain no-repeat`,
  width: "80px",
  height: "70px",
};

export class CheeseView extends CustomTagView {
  constructor(
    public elementClass: string | undefined,
    public elementId: string | undefined
  ) {
    super(CSS_STYLES.background, CSS_STYLES.width, CSS_STYLES.height);
    this.configureView(elementClass, elementId);
  }

  private configureView(
    elementClass: string | undefined,
    elementId: string | undefined
  ): void {
    if (elementClass) {
      this.className = elementClass;
    }
    if (elementId) {
      this.id = elementId;
    }
  }
}

customElements.define(CUSTOM_TAG_NAME, CheeseView);
