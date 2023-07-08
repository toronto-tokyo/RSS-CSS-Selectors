import "./level-view.css";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";
import { TableView } from "../table/table-view";
import { CssView } from "../css-view/css-view";
import { HTMLView } from "../html-view/html-view";
import ElementCreator from "../../../util/element-creator/element-creator";
import { LEVELS_DATA } from "../../../../data/levels-data";
import { View } from "../../view";
import { State } from "../../../state/state";

const CSS_CLASSES = {
  levelsView: ["levels-view"],
  levelLink: ["levels-view__link"],
  levelTitle: ["levels-view__title"],
  selectedLink: ["selected"],
};

const TEXT_CONTENT = {
  title: "Choose level",
};

export class LevelsView extends View {
  private linkElements: IElementCreator[];

  private levelRightAnswer: string;

  constructor(
    private tableView: TableView,
    private cssView: CssView,
    private htmlView: HTMLView,
    private state: State
  ) {
    const levelsViewParam: IElementCreatorParam = {
      tag: "div",
      textContent: "",
      cssClasses: CSS_CLASSES.levelsView,
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
      cssClasses: CSS_CLASSES.levelTitle,
      textContent: TEXT_CONTENT.title,
      callback: null,
    };
    const levelsTitleCreator: ElementCreator = new ElementCreator(
      levelsTitleParam
    );
    this.viewElement.addInnerElement(levelsTitleCreator);
  }

  private addLevelsList(): void {
    LEVELS_DATA.forEach((levelData, index) => {
      const levelLinkParam: IElementCreatorParam = {
        tag: "div",
        cssClasses: CSS_CLASSES.levelLink,
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
      const levelLinkCreator: ElementCreator = new ElementCreator(
        levelLinkParam
      );
      const levelLinkElement: HTMLElement = levelLinkCreator.getElement();
      levelLinkElement.dataset.index = `${index}`;
      this.linkElements.push(levelLinkCreator);
      this.viewElement.addInnerElement(levelLinkCreator);
    });
  }

  public setSelectedLink(target: HTMLElement): void {
    if (target.className.includes(`${CSS_CLASSES.levelLink.flat(1)}`)) {
      const levelIndex: string | undefined = target.dataset.index;
      if (this.state) {
        this.state.setCurrentLevelIndex(levelIndex);
      }
      this.removeSelectedLinkStatus();
      target.classList.add(...CSS_CLASSES.selectedLink);
    }
  }

  private removeSelectedLinkStatus(): void {
    this.linkElements.forEach((el) => {
      const element: HTMLElement = el.getElement();
      element?.classList.remove(...CSS_CLASSES.selectedLink);
    });
  }
}
