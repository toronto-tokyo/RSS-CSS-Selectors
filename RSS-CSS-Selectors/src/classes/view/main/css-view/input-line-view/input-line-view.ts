import "./input-line.css";
import ElementCreator from "../../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../../util/element-creator/element-creator-types";

const CSS_CLASSES_INPUT_LINE = ["view__input-line"];
const CSS_CLASSES_INPUT_FIELD = [
  "view__input-filed",
  "view__input-filed--empty",
];
const CSS_CLASSES_INPUT_BUTTON = ["view__input-button"];

export class InputLineView {
  private element: IElementCreator;

  constructor() {
    const inputLineParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_INPUT_LINE,
      textContent: "",
      callback: null,
    };
    this.element = new ElementCreator(inputLineParams);
    this.configureView();
  }

  public getElement(): HTMLElement | null {
    return this.element.getElement();
  }

  private configureView(): void {
    this.createInputField();
    this.createInputButton();
  }

  private createInputField(): void {
    const inputFieldParams: IElementCreatorParam = {
      tag: "input",
      cssClasses: CSS_CLASSES_INPUT_FIELD,
      textContent: "",
      callback: null,
    };

    const inputField = new ElementCreator(inputFieldParams);
    const inputFieldElement = inputField.getElement();
    if (inputFieldElement) {
      inputFieldElement.setAttribute("type", "text");
      inputFieldElement.setAttribute("placeholder", "Type in a CSS selector");
    }
    this.element.addInnerElement(inputField);
  }

  private createInputButton(): void {
    const inputFieldParams: IElementCreatorParam = {
      tag: "button",
      cssClasses: CSS_CLASSES_INPUT_BUTTON,
      textContent: "Enter",
      callback: null,
    };

    const inputField = new ElementCreator(inputFieldParams);
    this.element.addInnerElement(inputField);
  }
}
