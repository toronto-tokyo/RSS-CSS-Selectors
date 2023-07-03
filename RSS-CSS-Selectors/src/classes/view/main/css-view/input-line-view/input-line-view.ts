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

  private inputFieldElement: HTMLElement | null;

  private levelRightAnswer: string;

  constructor(private table: TableView) {
    const inputLineParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_INPUT_LINE,
      textContent: "",
      callback: null,
    };
    this.element = new ElementCreator(inputLineParams);
    this.inputFieldElement = null;
    this.levelRightAnswer = "";
    this.configureView();
  }

  public getElement(): HTMLElement | null {
    return this.element.getElement();
  }

  public setLevelAnswer(value: string): void {
    this.levelRightAnswer = value;
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
      this.inputFieldElement = inputFieldElement;
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
      callback: {
        event: "click",
        callback: () => {
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
            if (a.length !== b.length) alert(false);
            else {
              const checkedArr = a.filter((el) => b.includes(el));
              if (checkedArr.length === a.length) alert(true);
              else alert(false);
            }
          }
        },
      },
    };

    const inputField = new ElementCreator(inputFieldParams);
    this.element.addInnerElement(inputField);
  }
}
