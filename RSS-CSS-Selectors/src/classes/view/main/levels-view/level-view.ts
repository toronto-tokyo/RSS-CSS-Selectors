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
          const target = event.target as HTMLDivElement;
          this.setSelectedLink(target);
        },
      },
    };
    this.element = new ElementCreator(levelsViewParam);
    this.linkElements = [];
    this.levelRightAnswer = "";
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
      this.levelRightAnswer = LEVELS_DATA[+loadedIndex].help;
      this.cssView.setContent(LEVELS_DATA[+loadedIndex].help);
      this.tableView.setContent(
        LEVELS_DATA[+loadedIndex].codeForTable,
        LEVELS_DATA[+loadedIndex].help
      );
      const enterButton = document.querySelector(
        ".view__input-button"
      ) as HTMLButtonElement;
      enterButton.addEventListener("click", () => {
        this.checkSelector();
      });
    });
    window.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.checkSelector();
      }
    });
  }

  private checkSelector(): void {
    const tableElement = this.tableView.getTableSurface();
    if (!tableElement) {
      throw new Error();
    }
    const input = document.querySelector(
      ".view__input-filed"
    ) as HTMLInputElement;
    const inputValue = input.value;
    const rightSelector = this.levelRightAnswer;
    if (input.value.length && rightSelector) {
      const userSelectedElements = tableElement.querySelectorAll(
        `${inputValue}`
      );
      const rightSelectedElements = tableElement.querySelectorAll(
        `${rightSelector}`
      );
      const a = Array.from(userSelectedElements);
      const b = Array.from(rightSelectedElements);
      const mainElement = document.querySelector("main") as HTMLElement;
      const fieldsElements = document.querySelector(".fields") as HTMLElement;
      const htmlView = document.querySelector(".html-view") as HTMLElement;
      if (a.length !== b.length) {
        mainElement.classList.add("wrong-answer__background");
        fieldsElements.classList.add("wrong-answer__fields");
      } else {
        const checkedArr = a.filter((el) => b.includes(el));
        if (checkedArr.length === a.length) {
          mainElement.classList.add("right-answer__background");
          htmlView.classList.add("html-view--active");

          const index = state.getLevelIndex();
          let newIndex = +index + 1;
          if (newIndex >= LEVELS_DATA.length) {
            newIndex = 0;
            state.setLevelNameField(`${newIndex}`);
            const targetLinkCreator = this.linkElements.find((el) => {
              const element = el.getElement();
              if (!element) {
                throw new Error();
              }
              return element.dataset.index === `${newIndex}`;
            });
            const targetLinkElement =
              targetLinkCreator?.getElement() as HTMLDivElement;
            this.setSelectedLink(targetLinkElement);
            this.htmlView.setContent(LEVELS_DATA[newIndex].htmlCode);
            this.levelRightAnswer = LEVELS_DATA[newIndex].help;
            this.cssView.setContent(LEVELS_DATA[newIndex].help);
            this.tableView.setContent(
              LEVELS_DATA[newIndex].codeForTable,
              LEVELS_DATA[newIndex].help
            );
            alert("You woon");
          } else {
            state.setLevelNameField(`${newIndex}`);
            const targetLinkCreator = this.linkElements.find((el) => {
              const element = el.getElement();
              if (!element) {
                throw new Error();
              }
              return element.dataset.index === `${newIndex}`;
            });
            const targetLinkElement =
              targetLinkCreator?.getElement() as HTMLDivElement;
            this.setSelectedLink(targetLinkElement);
            this.htmlView.setContent(LEVELS_DATA[+newIndex].htmlCode);
            this.levelRightAnswer = LEVELS_DATA[+newIndex].help;
            this.cssView.setContent(LEVELS_DATA[+newIndex].help);
            this.tableView.setContent(
              LEVELS_DATA[+newIndex].codeForTable,
              LEVELS_DATA[+newIndex].help
            );
          }
        } else {
          mainElement.classList.remove("wrong-answer__background");
          fieldsElements.classList.add("wrong-answer__fields");
        }
      }
      mainElement.addEventListener("animationend", () => {
        mainElement.classList.remove("wrong-answer__background");
        mainElement.classList.remove("right-answer__background");
      });
      fieldsElements.addEventListener("animationend", () => {
        fieldsElements.classList.remove("wrong-answer__fields");
      });
      htmlView.addEventListener("animationend", () => {
        htmlView.classList.remove("html-view--active");
      });
    }
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
            this.levelRightAnswer = levelData.help;
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
