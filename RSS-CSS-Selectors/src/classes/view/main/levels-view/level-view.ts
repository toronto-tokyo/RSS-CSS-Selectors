import "./level-view.css";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";
import { TableView } from "../table/table-view";
import { CssView } from "../css-view/css-view";
import { HTMLView } from "../html-view/html-view";
import ElementCreator from "../../../util/element-creator/element-creator";
import { LEVELS_DATA } from "../../../../data/lelels-data";

const CSS_CLASSES = ["levels-view"];

export class LevelsView {
  private element: IElementCreator;

  constructor(tableView: TableView, cssView: CssView, htmlView: HTMLView) {
    const levelsViewParam: IElementCreatorParam = {
      tag: "div",
      textContent: "",
      cssClasses: CSS_CLASSES,
      callback: null,
    };
    this.element = new ElementCreator(levelsViewParam);
    this.configureView(tableView, cssView, htmlView);
  }

  public getElement(): HTMLElement | null {
    return this.element.getElement();
  }

  private configureView(
    tableView: TableView,
    cssView: CssView,
    htmlView: HTMLView
  ): void {
    LEVELS_DATA.forEach((levelData) => {
      const levelLinkParam: IElementCreatorParam = {
        tag: "div",
        cssClasses: [],
        textContent: `${levelData.title}`,
        callback: {
          event: "click",
          callback: () => {
            const htmlCode = document.createElement("pre");
            htmlCode.className = "html-code";
            htmlCode.textContent = levelData.htmlCode;
            htmlView.setContent(htmlCode);
            tableView.setContent(levelData.codeForTable);
            cssView.setContent("");
          },
        },
      };
      const levelLinkCreator = new ElementCreator(levelLinkParam);
      this.element.addInnerElement(levelLinkCreator);
    });
  }
}
