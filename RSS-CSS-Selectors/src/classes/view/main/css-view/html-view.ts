import "./html-view.css";
import ElementCreator from "../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";
import { NumbersLineView } from "./numbers-line-view/numbers-line-view";

const CSS_CLASSES = ["view"];
const CSS_CLASSES_CSS_TOP_LINE = ["view__top-line"];
const CSS_CLASSES_CSS_TOP_LINE_TITLE = ["view__title"];
const CSS_CLASSES_CSS_TOP_LINE_DESCRIPTION = ["view__description"];
const CSS_CLASSES_CSS_CONTENT_WRAP = ["view__content-wrapper"];
const CSS_CLASSES_CSS_CONTENT = ["view__content"];

export class HTMLView {
  private element: IElementCreator;

  constructor() {
    const htmlViewParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES,
      textContent: "",
      callback: null,
    };

    this.element = new ElementCreator(htmlViewParam);
    this.configureView();
  }

  public getElement(): HTMLElement | null {
    return this.element.getElement();
  }

  private configureView(): void {
    this.createTopLine();
    this.createContentField();
  }

  private createTopLine(): void {
    const topLineParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_CSS_TOP_LINE,
      textContent: "",
      callback: null,
    };
    const topLine = new ElementCreator(topLineParams);

    const topLineTitleParams: IElementCreatorParam = {
      tag: "h2",
      cssClasses: CSS_CLASSES_CSS_TOP_LINE_TITLE,
      textContent: "HTML Viewer",
      callback: null,
    };
    const topLineTitle = new ElementCreator(topLineTitleParams);

    const topLineDescriptionParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_CSS_TOP_LINE_DESCRIPTION,
      textContent: "table.html",
      callback: null,
    };
    const topLineDescription = new ElementCreator(topLineDescriptionParams);

    topLine.addInnerElement(topLineTitle);
    topLine.addInnerElement(topLineDescription);

    this.element.addInnerElement(topLine);
  }

  private createContentField(): void {
    const contentWrapParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_CSS_CONTENT_WRAP,
      textContent: "",
      callback: null,
    };
    const contentWrap = new ElementCreator(contentWrapParams);

    const contentParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_CSS_CONTENT,
      textContent: "",
      callback: null,
    };
    const content = new ElementCreator(contentParams);

    const numbersLine = new NumbersLineView();
    const numberLineElement = numbersLine.getElement();
    if (numberLineElement) {
      contentWrap.addInnerElement(numberLineElement);
    }
    contentWrap.addInnerElement(content);
    this.element.addInnerElement(contentWrap);
  }
}
