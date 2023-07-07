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
import { View } from "../view";

const CSS_CLASSES = {
  main: ["main"],
  contentWrapper: ["main__wrapper"],
  fields: ["fields"],
};

export class MainView extends View {
  private tableView: TableView | null;

  private cssView: CssView | null;

  private htmlView: HTMLView | null;

  private levelsView: LevelsView | null;

  private contentFields: IElementCreator | null;

  constructor() {
    const mainParam: IElementCreatorParam = {
      tag: "main",
      cssClasses: CSS_CLASSES.main,
      textContent: "",
      callback: null,
    };
    super(mainParam);
    this.tableView = null;
    this.cssView = null;
    this.htmlView = null;
    this.levelsView = null;
    this.contentFields = null;
    this.configureView();
  }

  protected configureView(): void {
    const contentWrapperCreator = this.createContentWrapper();
    const contentWrapperElement = contentWrapperCreator.getElement();

    this.createLevelsView();
    const levelsViewElement = this.levelsView?.getViewElement();

    if (contentWrapperElement && levelsViewElement) {
      this.viewElement.addInnerElement(contentWrapperElement);
      this.viewElement.addInnerElement(levelsViewElement);
    }
    this.activateChecker();
  }

  private createLevelsView(): void {
    if (this.tableView && this.cssView && this.htmlView) {
      const levelsView = new LevelsView(
        this.tableView,
        this.cssView,
        this.htmlView
      );
      this.levelsView = levelsView;
    }
  }

  private createContentWrapper(): IElementCreator {
    this.createTable();
    this.createContentFields();

    const contentWrapperParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.contentWrapper,
      textContent: "",
      callback: null,
    };
    const contentWrapper = new ElementCreator(contentWrapperParams);

    const tableElement = this.tableView?.getViewElement();
    const fieldsElement = this.contentFields?.getElement();
    if (tableElement && fieldsElement) {
      contentWrapper.addInnerElement(tableElement);
      contentWrapper.addInnerElement(fieldsElement);
    }
    return contentWrapper;
  }

  private createTable(): void {
    const table = new TableView();
    this.tableView = table;
  }

  private createContentFields(): void {
    this.createCssView();
    this.createHtmlView();

    const fieldsParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.fields,
      textContent: "",
      callback: null,
    };
    const fields = new ElementCreator(fieldsParams);
    this.contentFields = fields;

    const cssViewElement = this.cssView?.getContentFieldWrapElement();
    const htmlViewElement = this.htmlView?.getContentFieldWrapElement();
    if (cssViewElement && htmlViewElement) {
      fields.addInnerElement(cssViewElement);
      fields.addInnerElement(htmlViewElement);
    }
  }

  private createCssView(): void {
    if (this.tableView) {
      const cssView = new CssView(this.tableView);
      this.cssView = cssView;
    }
  }

  private createHtmlView(): void {
    const htmlView = new HTMLView();
    this.htmlView = htmlView;
  }

  private activateChecker(): void {
    if (
      this.tableView &&
      this.cssView &&
      this.htmlView &&
      this.levelsView &&
      this.contentFields
    ) {
      const checker = new Checker(
        this.tableView,
        this.cssView,
        this.htmlView,
        this.levelsView,
        this.contentFields.getElement()
      );
      checker.runChecker();
    }
  }
}
