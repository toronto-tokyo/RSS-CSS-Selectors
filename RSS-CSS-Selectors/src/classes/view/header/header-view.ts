import "./header.css";
import { View } from "../view";
import { IElementCreatorParam } from "../../util/element-creator/element-creator-types";
import ElementCreator from "../../util/element-creator/element-creator";

const CSS_CLASSES = {
  header: ["header"],
  title: ["header__title"],
};

export class HeaderView extends View {
  constructor() {
    const headerParam: IElementCreatorParam = {
      tag: "header",
      cssClasses: CSS_CLASSES.header,
      textContent: "",
      callback: null,
    };
    super(headerParam);
    this.configureView();
  }

  protected configureView(): void {
    const h1Param: IElementCreatorParam = {
      tag: "h1",
      cssClasses: CSS_CLASSES.title,
      textContent: "RSS CSS Selectors",
      callback: null,
    };

    const h1Element = new ElementCreator(h1Param);
    this.viewElement.addInnerElement(h1Element);
  }
}
