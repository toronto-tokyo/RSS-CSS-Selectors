import "./html-view.css";
import {
  IElementCreator,
  IElementCreatorParam,
} from "@element-creator/element-creator-types";
import { ContentFieldsView } from "@content-fields-view/content-fields-view";
import { clearWrapperElement } from "@main-view/functions";

const CSS_CLASSES = {
  htmlView: ["view", "html-view"],
  htmlCode: ["html-code"],
};

const TEXT_CONTENT = {
  topLineTitle: "HTML Viewer",
  topLineDescription: "table.html",
};

export class HTMLView extends ContentFieldsView {
  constructor() {
    const htmlViewParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.htmlView,
      textContent: "",
      callback: null,
    };

    super(htmlViewParam);
    this.configureView();
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
  }

  public setContent(content: string): void {
    this.clearHtmlViewContentElement();
    const htmlCode: HTMLPreElement = document.createElement("pre");
    htmlCode.classList.add(...CSS_CLASSES.htmlCode);
    htmlCode.textContent = content;
    this.getContentField()?.addInnerElement(htmlCode);
  }

  private clearHtmlViewContentElement(): void {
    const elementCreator: IElementCreator | null = this.getContentField();
    const element: HTMLElement | undefined = elementCreator?.getElement();
    if (element) {
      clearWrapperElement(element);
    }
  }
}
