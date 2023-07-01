import "./main.css";
import ElementCreator from "../../util/element-creator/element-creator";
import {
  IElementCreatorParam,
  IElementCreator,
} from "../../util/element-creator/element-creator-types";
import { TableView } from "./table/table-view";
import { CssView } from "./css-view/css-view";
import { HTMLView } from "./css-view/html-view";

const CSS_CLASSES = ["main"];
const CSS_CLASSES_FIELDS = ["fields"];

export class MainView {
  private element: IElementCreator;

  constructor() {
    const mainParam: IElementCreatorParam = {
      tag: "main",
      cssClasses: CSS_CLASSES,
      textContent: "",
      callback: null,
    };

    this.element = new ElementCreator(mainParam);
    this.configureView();
  }

  public getElement(): HTMLElement | null {
    return this.element.getElement();
  }

  private configureView(): void {
    const table = new TableView();
    const tableElement = table.getElement();

    const fieldsParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_FIELDS,
      textContent: "",
      callback: null,
    };
    const fields = new ElementCreator(fieldsParams);
    const fieldsElement = fields.getElement();

    const cssView = new CssView();
    const cssViewElement = cssView.getElement();
    const htmlView = new HTMLView();
    const htmlViewElement = htmlView.getElement();

    if (cssViewElement && htmlViewElement) {
      fields.addInnerElement(cssViewElement);
      fields.addInnerElement(htmlViewElement);
    }

    if (tableElement && fieldsElement) {
      this.element.addInnerElement(tableElement);
      this.element.addInnerElement(fieldsElement);
    }
  }
}
