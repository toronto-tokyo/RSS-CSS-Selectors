import "./input-line.css";
import ElementCreator from "@element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "@element-creator/element-creator-types";

const CSS_CLASSES = {
  inputLine: ["view__input-line"],
  inputField: ["view__input-filed"],
  inputButton: ["view__input-button"],
};

const TEXT_BUTTON = {
  enterButton: "Enter",
};

const INPUT_FIELD_ATTRIBUTES = {
  type: "text",
  placeHolder: "Type in a CSS selector",
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
    const inputField: HTMLInputElement = document.createElement("input");
    inputField.classList.add(...CSS_CLASSES.inputField);
    inputField.setAttribute("type", INPUT_FIELD_ATTRIBUTES.type);
    inputField.setAttribute("placeholder", INPUT_FIELD_ATTRIBUTES.placeHolder);
    this.element.addInnerElement(inputField);
    return inputField;
  }

  private createInputButton(): HTMLElement {
    const inputFieldParams: IElementCreatorParam = {
      tag: "button",
      cssClasses: CSS_CLASSES.inputButton,
      textContent: TEXT_BUTTON.enterButton,
      callback: null,
    };

    const inputField: ElementCreator = new ElementCreator(inputFieldParams);
    this.element.addInnerElement(inputField);
    return inputField.getElement();
  }
}
