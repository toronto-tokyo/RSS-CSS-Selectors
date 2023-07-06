import "./input-line.css";
import ElementCreator from "../../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../../util/element-creator/element-creator-types";
import { TableView } from "../../table/table-view";

const CSS_CLASSES_INPUT_LINE = ["view__input-line"];
const CSS_CLASSES_INPUT_FIELD = [
  "view__input-filed",
  "view__input-filed--empty",
];
const CSS_CLASSES_INPUT_BUTTON = ["view__input-button"];

export class InputLineView {
  private element: IElementCreator;

  private inputFieldElement: HTMLElement;

  private levelRightAnswer: string;

  constructor(private table: TableView) {
    const inputLineParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_INPUT_LINE,
      textContent: "",
      callback: null,
    };
    this.element = new ElementCreator(inputLineParams);
    this.inputFieldElement = this.createInputField();
    this.levelRightAnswer = "";
    this.configureView();
  }

  public getElement(): HTMLElement {
    return this.element.getElement();
  }

  public getInputElement(): HTMLElement {
    return this.inputFieldElement;
  }

  public setLevelAnswer(value: string): void {
    this.levelRightAnswer = value;
  }

  private configureView(): void {
    this.createInputButton();
  }

  private createInputField(): HTMLElement {
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
    return inputFieldElement;
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

  private checkSelector(): void {
    const tableElement = this.table.getTableSurface();
    if (!tableElement) {
      throw new Error();
    }
    const input = this.inputFieldElement as HTMLInputElement;
    const inputValue = input.value;
    const rightSelector = this.levelRightAnswer;
    if (input.value.length && rightSelector) {
      const userSelectedElements = tableElement.querySelectorAll(
        `${inputValue}`
      );
      const rightSelectedElements = tableElement.querySelectorAll(
        `${rightSelector}`
      );
      const a = Array.from(userSelectedElements);
      const b = Array.from(rightSelectedElements);
      const mainElement = document.querySelector("main") as HTMLElement;
      const fieldsElements = document.querySelector(".fields") as HTMLElement;
      const htmlView = document.querySelector(".html-view") as HTMLElement;
      if (a.length !== b.length) {
        mainElement.classList.add("wrong-answer__background");
        fieldsElements.classList.add("wrong-answer__fields");
      } else {
        const checkedArr = a.filter((el) => b.includes(el));
        if (checkedArr.length === a.length) {
          mainElement.classList.add("right-answer__background");
          htmlView.classList.add("html-view--active");
        } else {
          mainElement.classList.remove("wrong-answer__background");
          fieldsElements.classList.add("wrong-answer__fields");
        }
      }
      mainElement.addEventListener("animationend", () => {
        mainElement.classList.remove("wrong-answer__background");
        mainElement.classList.remove("right-answer__background");
      });
      fieldsElements.addEventListener("animationend", () => {
        fieldsElements.classList.remove("wrong-answer__fields");
      });
      htmlView.addEventListener("animationend", () => {
        htmlView.classList.remove("html-view--active");
      });
    }
  }

  private activateEnterFromKeyBoard(): void {
    window.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.checkSelector();
      }
    });
  }
}
