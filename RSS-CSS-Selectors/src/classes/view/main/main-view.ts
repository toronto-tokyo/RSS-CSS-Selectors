import "./main.css";
import ElementCreator from "../../util/element-creator/element-creator";
import {
  IElementCreatorParam,
  IElementCreator,
} from "../../util/element-creator/element-creator-types";
import { TableView } from "./table/table-view";
import { CssView } from "./css-view/css-view";
import { HTMLView } from "./html-view/html-view";
import { LevelsView } from "./levels-view/level-view";
import { Checker } from "./checker";

const CSS_CLASSES = ["main"];
const CSS_CLASSES_CONTENT_WRAPPER = ["main__wrapper"];
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
    const tableElement = table.getViewElement();
    const fieldsParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_FIELDS,
      textContent: "",
      callback: null,
    };
    const fields = new ElementCreator(fieldsParams);
    const fieldsElement = fields.getElement();
    const cssView = new CssView(table);
    const cssViewElement = cssView.getContentFieldWrapElement();
    const htmlView = new HTMLView();
    const htmlViewElement = htmlView.getContentFieldWrapElement();
    if (cssViewElement && htmlViewElement) {
      fields.addInnerElement(cssViewElement);
      fields.addInnerElement(htmlViewElement);
    }
    const contentWrapperParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_CONTENT_WRAPPER,
      textContent: "",
      callback: null,
    };
    const contentWrapper = new ElementCreator(contentWrapperParams);
    const contentWrapperElement = contentWrapper.getElement();
    if (contentWrapper && tableElement && fieldsElement) {
      contentWrapper.addInnerElement(tableElement);
      contentWrapper.addInnerElement(fieldsElement);
    }
    const levelsView = new LevelsView(table, cssView, htmlView);
    const levelsViewElement = levelsView.getViewElement();
    if (contentWrapperElement && levelsViewElement) {
      this.element.addInnerElement(contentWrapperElement);
      this.element.addInnerElement(levelsViewElement);
    }
    const checker = new Checker(
      table,
      cssView,
      htmlView,
      levelsView,
      fieldsElement
    );
    checker.runChecker();
  }
}
