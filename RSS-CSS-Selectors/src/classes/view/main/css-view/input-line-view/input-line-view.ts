import "./input-line.css";
import ElementCreator from "../../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../../util/element-creator/element-creator-types";

const CSS_CLASSES = {
  inputLine: ["view__input-line"],
  inputField: ["view__input-filed"],
  inputButton: ["view__input-button"],
};

export class InputLineView {
  private element: IElementCreator;

  private inputFieldElement: HTMLInputElement;

  private enterButton: HTMLElement;

  constructor() {
    const inputLineParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.inputLine,
      textContent: "",
      callback: null,
    };
    this.element = new ElementCreator(inputLineParams);
    this.inputFieldElement = this.createInputField();
    this.enterButton = this.createInputButton();
  }

  public getElement(): HTMLElement {
    return this.element.getElement();
  }

  public getInputFieldElement(): HTMLInputElement {
    return this.inputFieldElement;
  }

  public getEnterButton(): HTMLElement {
    return this.enterButton;
  }

  private createInputField(): HTMLInputElement {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.classList.add(...CSS_CLASSES.inputField);
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Type in a CSS selector");
    this.element.addInnerElement(inputField);
    return inputField;
  }

  private createInputButton(): HTMLElement {
    const inputFieldParams: IElementCreatorParam = {
      tag: "button",
      cssClasses: CSS_CLASSES.inputButton,
      textContent: "Enter",
      callback: null,
    };

    const inputField = new ElementCreator(inputFieldParams);
    this.element.addInnerElement(inputField);
    return inputField.getElement();
  }
}
