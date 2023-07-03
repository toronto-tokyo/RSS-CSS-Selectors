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
const CSS_CLASSES_LVL_LINK = ["levels-view__link"];
const CSS_CLASSES_LVL_TITLE = ["levels-view__title"];

export class LevelsView {
  private element: IElementCreator;

  private linkElements: IElementCreator[];

  constructor(tableView: TableView, cssView: CssView, htmlView: HTMLView) {
    const levelsViewParam: IElementCreatorParam = {
      tag: "div",
      textContent: "",
      cssClasses: CSS_CLASSES,
      callback: {
        event: "click",
        callback: (event) => {
          const target = event.target as HTMLDivElement;
          if (target.className.includes("levels-view__link")) {
            this.setSelectedLink(target);
          }
        },
      },
    };
    this.element = new ElementCreator(levelsViewParam);
    this.linkElements = [];
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
    const levelsTitleParam: IElementCreatorParam = {
      tag: "h2",
      cssClasses: CSS_CLASSES_LVL_TITLE,
      textContent: "Choose level",
      callback: null,
    };
    const levelsTitleCreator = new ElementCreator(levelsTitleParam);
    this.element.addInnerElement(levelsTitleCreator);
    LEVELS_DATA.forEach((levelData) => {
      const levelLinkParam: IElementCreatorParam = {
        tag: "div",
        cssClasses: CSS_CLASSES_LVL_LINK,
        textContent: `${levelData.title}`,
        callback: {
          event: "click",
          callback: () => {
            const htmlCode = document.createElement("pre");
            htmlCode.className = "html-code";
            htmlCode.textContent = levelData.htmlCode;
            htmlView.setContent(htmlCode);
            tableView.setContent(levelData.codeForTable, levelData.help);
            cssView.setContent(levelData.help);
          },
        },
      };
      const levelLinkCreator = new ElementCreator(levelLinkParam);
      this.linkElements.push(levelLinkCreator);
      this.element.addInnerElement(levelLinkCreator);
    });
  }

  private setSelectedLink(link: HTMLElement): void {
    this.linkElements.forEach((el) => {
      const element = el.getElement();
      element?.classList.remove("selected");
    });
    link.classList.add("selected");
  }
}
