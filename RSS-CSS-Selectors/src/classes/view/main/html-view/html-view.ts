import "./html-view.css";
import { IElementCreatorParam } from "../../../util/element-creator/element-creator-types";
import { ContentFieldsView } from "../content-fields-view/content-fields-view";
import { clearWrapperElement } from "../functions";

const CSS_CLASSES = ["view", "html-view"];

export class HTMLView extends ContentFieldsView {
  constructor() {
    const htmlViewParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES,
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
    super.createTopLine("HTML Viewer", "table.html");
  }

  protected createContentField(): void {
    super.createContentField();
  }

  public setContent(content: string): void {
    this.clearHtmlViewContentElement();
    const htmlCode = document.createElement("pre");
    htmlCode.className = "html-code";
    htmlCode.textContent = content;
    this.getContentField()?.addInnerElement(htmlCode);
  }

  private clearHtmlViewContentElement(): void {
    const elementCreator = this.getContentField();
    const element = elementCreator?.getElement();
    if (element) {
      clearWrapperElement(element);
    }
  }
}
