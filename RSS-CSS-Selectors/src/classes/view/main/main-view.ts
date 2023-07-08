import "./main.css";
import ElementCreator from "@element-creator/element-creator";
import {
  IElementCreatorParam,
  IElementCreator,
} from "@element-creator/element-creator-types";
import { TableView } from "@table-view/table-view";
import { CssView } from "@css-view/css-view";
import { HTMLView } from "@html-view/html-view";
import { LevelsView } from "@levels-view/level-view";
import { Checker } from "@main-view/checker";
import { View } from "@view/view";
import { State } from "@state/state";

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

  private state: State;

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
    this.state = new State();
    this.configureView();
  }

  protected configureView(): void {
    const contentWrapperCreator: IElementCreator = this.createContentWrapper();
    const contentWrapperElement: HTMLElement =
      contentWrapperCreator.getElement();

    this.createLevelsView();
    const levelsViewElement: HTMLElement | undefined =
      this.levelsView?.getViewElement();

    if (contentWrapperElement && levelsViewElement) {
      this.viewElement.addInnerElement(contentWrapperElement);
      this.viewElement.addInnerElement(levelsViewElement);
    }
    this.activateChecker();
  }

  private createLevelsView(): void {
    if (this.tableView && this.cssView && this.htmlView) {
      const levelsView: LevelsView = new LevelsView(
        this.tableView,
        this.cssView,
        this.htmlView,
        this.state
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
    const contentWrapper: ElementCreator = new ElementCreator(
      contentWrapperParams
    );

    const tableElement: HTMLElement | undefined =
      this.tableView?.getViewElement();
    const fieldsElement: HTMLElement | undefined =
      this.contentFields?.getElement();
    if (tableElement && fieldsElement) {
      contentWrapper.addInnerElement(tableElement);
      contentWrapper.addInnerElement(fieldsElement);
    }
    return contentWrapper;
  }

  private createTable(): void {
    const table: TableView = new TableView();
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
    const fields: ElementCreator = new ElementCreator(fieldsParams);
    this.contentFields = fields;

    const cssViewElement: HTMLElement | undefined =
      this.cssView?.getContentFieldWrapElement();
    const htmlViewElement: HTMLElement | undefined =
      this.htmlView?.getContentFieldWrapElement();
    if (cssViewElement && htmlViewElement) {
      fields.addInnerElement(cssViewElement);
      fields.addInnerElement(htmlViewElement);
    }
  }

  private createCssView(): void {
    const cssView: CssView = new CssView();
    this.cssView = cssView;
  }

  private createHtmlView(): void {
    const htmlView: HTMLView = new HTMLView();
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
      const checker: Checker = new Checker(
        this.state,
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
