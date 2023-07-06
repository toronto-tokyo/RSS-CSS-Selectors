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
import { View } from "../../view";

const CSS_CLASSES = ["levels-view"];
const CSS_CLASSES_LVL_LINK = ["levels-view__link"];
const CSS_CLASSES_LVL_TITLE = ["levels-view__title"];

export class LevelsView extends View {
  private linkElements: IElementCreator[];

  private levelRightAnswer: string;

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
          const { target } = event;
          if (target instanceof HTMLDivElement) {
            this.setSelectedLink(target);
          }
        },
      },
    };
    super(levelsViewParam);
    this.linkElements = [];
    this.levelRightAnswer = "";
    this.configureView();
  }

  public getLinkElements(): IElementCreator[] {
    return this.linkElements;
  }

  public getLevelRightAnswer(): string {
    return this.levelRightAnswer;
  }

  public setLevelRightAnswer(value: string): void {
    this.levelRightAnswer = value;
  }

  protected configureView(): void {
    this.addLevelsTitle();
    this.addLevelsList();
  }

  private addLevelsTitle(): void {
    const levelsTitleParam: IElementCreatorParam = {
      tag: "h2",
      cssClasses: CSS_CLASSES_LVL_TITLE,
      textContent: "Choose level",
      callback: null,
    };
    const levelsTitleCreator = new ElementCreator(levelsTitleParam);
    this.viewElement.addInnerElement(levelsTitleCreator);
  }

  private addLevelsList(): void {
    LEVELS_DATA.forEach((levelData, index) => {
      const levelLinkParam: IElementCreatorParam = {
        tag: "div",
        cssClasses: CSS_CLASSES_LVL_LINK,
        textContent: `${levelData.title}`,
        callback: {
          event: "click",
          callback: () => {
            this.htmlView.setContent(levelData.htmlCode);
            this.tableView.setContent(levelData.codeForTable, levelData.help);
            this.levelRightAnswer = levelData.help;
            this.cssView.setContent(levelData.help);
          },
        },
      };
      const levelLinkCreator = new ElementCreator(levelLinkParam);
      const levelLinkElement = levelLinkCreator.getElement();
      levelLinkElement.dataset.index = `${index}`;
      this.linkElements.push(levelLinkCreator);
      this.viewElement.addInnerElement(levelLinkCreator);
    });
  }

  public setSelectedLink(target: HTMLElement): void {
    if (target.className.includes("levels-view__link")) {
      const levelIndex = target.dataset.index;
      state.setCurrentLevelIndex(levelIndex);
      this.removeSelectedLinkStatus();
      target.classList.add("selected");
    }
  }

  private removeSelectedLinkStatus(): void {
    this.linkElements.forEach((el) => {
      const element = el.getElement();
      element?.classList.remove("selected");
    });
  }
}
