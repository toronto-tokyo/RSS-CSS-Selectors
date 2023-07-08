import "./css-view.css";
import ElementCreator from "../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";
import { InputLineView } from "./input-line-view/input-line-view";
import { ContentFieldsView } from "../content-fields-view/content-fields-view";

const CSS_CLASSES = {
  view: ["view"],
  helpButton: ["help-button"],
};

const TEXT_CONTENT = {
  topLineTitle: "CSS Editor",
  topLineDescription: "style.css",
  helpButton: "Help",
};

export class CssView extends ContentFieldsView {
  private inputLine: InputLineView | null;

  private helpAnswer: string;

  private enterButton: HTMLElement | null;

  constructor() {
    const cssViewParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.view,
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
    super.createTopLine(
      TEXT_CONTENT.topLineTitle,
      TEXT_CONTENT.topLineDescription
    );
  }

  protected createContentField(): void {
    super.createContentField();

    const inputLine: InputLineView = new InputLineView();
    this.inputLine = inputLine;
    this.enterButton = inputLine.getEnterButton();
    const inputLineElement: HTMLElement = inputLine.getElement();

    const contentFieldCreator: IElementCreator | null = this.getContentField();
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
      cssClasses: CSS_CLASSES.helpButton,
      textContent: TEXT_CONTENT.helpButton,
      callback: {
        event: "click",
        callback: () => {
          const inputFieldElement: HTMLInputElement | undefined =
            this.inputLine?.getInputFieldElement();
          if (inputFieldElement) {
            inputFieldElement.value = this.helpAnswer;
          }
        },
      },
    };
    const buttonElementCreator: ElementCreator = new ElementCreator(
      buttonElementParam
    );
    const buttonElement: HTMLElement = buttonElementCreator.getElement();
    return buttonElement;
  }
}
