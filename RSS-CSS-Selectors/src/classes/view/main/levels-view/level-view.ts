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
import { state } from "../../../state/state";

const CSS_CLASSES = ["levels-view"];
const CSS_CLASSES_LVL_LINK = ["levels-view__link"];
const CSS_CLASSES_LVL_TITLE = ["levels-view__title"];

export class LevelsView {
  private element: IElementCreator;

  private linkElements: IElementCreator[];

  constructor(
    private tableView: TableView,
    private cssView: CssView,
    private htmlView: HTMLView
  ) {
    const levelsViewParam: IElementCreatorParam = {
      tag: "div",
      textContent: "",
      cssClasses: CSS_CLASSES,
      callback: {
        event: "click",
        callback: (event) => {
          const target = event.target as HTMLDivElement;
          this.setSelectedLink(target);
        },
      },
    };
    this.element = new ElementCreator(levelsViewParam);
    this.linkElements = [];
    this.configureView(tableView, cssView, htmlView);
    this.setSelectedLevelAfterLoad();
  }

  private setSelectedLevelAfterLoad(): void {
    window.addEventListener("load", () => {
      const loadedIndex = state.getLevelIndex();
      const targetLinkCreator = this.linkElements.find((el) => {
        const element = el.getElement();
        if (!element) {
          throw new Error();
        }
        return element.dataset.index === loadedIndex;
      });
      const targetLinkElement = targetLinkCreator?.getElement();
      targetLinkElement?.classList.add("selected");
      this.htmlView.setContent(LEVELS_DATA[+loadedIndex].htmlCode);
      this.cssView.setContent(LEVELS_DATA[+loadedIndex].help);
      this.tableView.setContent(
        LEVELS_DATA[+loadedIndex].codeForTable,
        LEVELS_DATA[+loadedIndex].help
      );
    });
  }

  private setSelectedLink(target: HTMLDivElement): void {
    if (target.className.includes("levels-view__link")) {
      const levelIndex = target.dataset.index;
      if (levelIndex) {
        state.setLevelNameField(levelIndex);
      }
      this.linkElements.forEach((el) => {
        const element = el.getElement();
        element?.classList.remove("selected");
      });
      target.classList.add("selected");
    }
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
    LEVELS_DATA.forEach((levelData, index) => {
      const levelLinkParam: IElementCreatorParam = {
        tag: "div",
        cssClasses: CSS_CLASSES_LVL_LINK,
        textContent: `${levelData.title}`,
        callback: {
          event: "click",
          callback: () => {
            htmlView.setContent(levelData.htmlCode);
            tableView.setContent(levelData.codeForTable, levelData.help);
            cssView.setContent(levelData.help);
          },
        },
      };
      const levelLinkCreator = new ElementCreator(levelLinkParam);
      const levelLinkElement = levelLinkCreator.getElement();
      if (levelLinkElement) {
        levelLinkElement.dataset.index = `${index}`;
      }
      this.linkElements.push(levelLinkCreator);
      this.element.addInnerElement(levelLinkCreator);
    });
  }
}
