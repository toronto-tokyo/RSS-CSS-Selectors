import "./css-view.css";
import ElementCreator from "../../../util/element-creator/element-creator";
import { IElementCreatorParam } from "../../../util/element-creator/element-creator-types";
import { InputLineView } from "./input-line-view/input-line-view";
import { TableView } from "../table/table-view";
import { ContentFieldsView } from "../content-fields-view/content-fields-view";

const CSS_CLASSES = ["view"];
const CSS_CLASSES_CSS_HELP_BUTTON = ["help-button"];

const HELP_BUTTON_TEXT_CONTENT = "Help";

export class CssView extends ContentFieldsView {
  private inputLine: InputLineView | null;

  private helpAnswer: string;

  private enterButton: HTMLElement | null;

  constructor(private table: TableView) {
    const cssViewParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES,
      textContent: "",
      callback: null,
    };

    super(cssViewParam);
    this.inputLine = null;
    this.helpAnswer = "";
    this.enterButton = null;
    this.configureView();
    this.createHelpButton();
  }

  public getEnterButton(): HTMLElement | null {
    return this.enterButton;
  }

  public getInputFieldElement(): HTMLInputElement | undefined {
    return this.inputLine?.getInputFieldElement();
  }

  private configureView(): void {
    this.createTopLine();
    this.createContentField();
  }

  protected createTopLine(): void {
    super.createTopLine("CSS Editor", "style.css");
  }

  protected createContentField(): void {
    super.createContentField();

    const inputLine = new InputLineView();
    this.inputLine = inputLine;
    this.enterButton = inputLine.getEnterButton();
    const inputLineElement = inputLine.getElement();

    const contentFieldCreator = this.getContentField();
    if (contentFieldCreator) {
      contentFieldCreator.addInnerElement(inputLineElement);
      contentFieldCreator.addInnerElement(this.createHelpButton());
    }
  }

  public setContent(content: string): void {
    this.helpAnswer = content;
  }

  private createHelpButton(): HTMLElement {
    const buttonElementParam: IElementCreatorParam = {
      tag: "button",
      cssClasses: CSS_CLASSES_CSS_HELP_BUTTON,
      textContent: HELP_BUTTON_TEXT_CONTENT,
      callback: {
        event: "click",
        callback: () => {
          const inputFieldElement = this.inputLine?.getInputFieldElement();
          if (inputFieldElement) {
            inputFieldElement.value = this.helpAnswer;
          }
        },
      },
    };
    const buttonElementCreator = new ElementCreator(buttonElementParam);
    const buttonElement = buttonElementCreator.getElement();
    return buttonElement;
  }
}
