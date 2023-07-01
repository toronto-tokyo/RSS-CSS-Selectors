import "./header.css";
import ElementCreator from "../../util/element-creator/element-creator";
import {
  IElementCreatorParam,
  IElementCreator,
} from "../../util/element-creator/element-creator-types";

const CSS_CLASSES = ["header"];
const H1_CLASSES = ["header__title"];

export class HeaderView {
  private element: IElementCreator;

  constructor() {
    const headerParam: IElementCreatorParam = {
      tag: "header",
      cssClasses: CSS_CLASSES,
      textContent: "",
      callback: null,
    };

    this.element = new ElementCreator(headerParam);
    this.configureView();
  }

  public getElement(): HTMLElement | null {
    return this.element.getElement();
  }

  private configureView(): void {
    const h1Param: IElementCreatorParam = {
      tag: "h1",
      cssClasses: H1_CLASSES,
      textContent: "RSS CSS Selectors",
      callback: null,
    };

    const h1Element = new ElementCreator(h1Param);
    this.element.addInnerElement(h1Element);
  }
}
