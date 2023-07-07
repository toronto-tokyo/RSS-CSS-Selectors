import "./numbers-line-view.css";
import ElementCreator from "../../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../../util/element-creator/element-creator-types";

const CSS_CLASSES = {
  numbersLine: ["view__numbers-line"],
};
const LINES_COUNT = 15;

export class NumbersLineView {
  private element: IElementCreator;

  constructor() {
    const numbersLineParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.numbersLine,
      textContent: "",
      callback: null,
    };
    this.element = new ElementCreator(numbersLineParams);
    this.configureView();
  }

  public getElement(): HTMLElement {
    return this.element.getElement();
  }

  private configureView(): void {
    for (let i = 1; i <= LINES_COUNT; i += 1) {
      const numberInLineParams: IElementCreatorParam = {
        tag: "span",
        cssClasses: [],
        textContent: `${i}`,
        callback: null,
      };
      const numberInLine = new ElementCreator(numberInLineParams);
      const brTag = document.createElement("br");
      this.element.addInnerElement(numberInLine);
      this.element.addInnerElement(brTag);
    }
  }
}
