import { TableView } from "./table/table-view";
import { CssView } from "./css-view/css-view";
import { HTMLView } from "./html-view/html-view";
import { LevelsView } from "./levels-view/level-view";
import { LEVELS_DATA } from "../../../data/levels-data";
import { state } from "../../state/state";
import { IElementCreator } from "../../util/element-creator/element-creator-types";

const CSS_CLASSES = {
  onWrongAnswer: "wrong-answer__fields",
  onRightAnswer: "html-view--active",
};

const CHECK_SELECTOR_ON_KEY = "Enter";

export class Checker {
  constructor(
    private tableView: TableView,
    private cssView: CssView,
    private htmlView: HTMLView,
    private levelsView: LevelsView,
    private contentFieldsElement: HTMLElement
  ) {}

  public runChecker(): void {
    this.setSelectedLevelAfterLoad();
    this.checkSelectorOnKeyBoardKey();
    this.checkSelectorOnElement();
  }

  private setSelectedLevelAfterLoad(): void {
    window.addEventListener("load", () => {
      const loadedIndex: string = state.getLevelIndex();
      this.setLevelContent(+loadedIndex);
    });
  }

  private checkSelectorOnElement(): void {
    const enterButton: HTMLElement | null = this.cssView.getEnterButton();
    if (enterButton) {
      enterButton.addEventListener("click", () => {
        this.checkSelector();
      });
    }
  }

  private checkSelectorOnKeyBoardKey(): void {
    window.addEventListener("keyup", (event: KeyboardEvent) => {
      if (event.key === CHECK_SELECTOR_ON_KEY) {
        this.checkSelector();
      }
    });
  }

  private checkSelector(): void {
    const tableSurfaceElement: HTMLElement | null =
      this.tableView.getTableSurface();
    const inputFieldElement: HTMLInputElement | undefined =
      this.cssView.getInputFieldElement();
    if (!tableSurfaceElement || !inputFieldElement) {
      throw new Error();
    }

    const inputFieldValue: string = inputFieldElement.value;
    const rightSelector: string = this.levelsView.getLevelRightAnswer();

    if (inputFieldValue.length && rightSelector) {
      const userSelectedElements: NodeListOf<Element> =
        tableSurfaceElement.querySelectorAll(`${inputFieldValue}`);
      const rightSelectedElements: NodeListOf<Element> =
        tableSurfaceElement.querySelectorAll(`${rightSelector}`);
      const userSelectedElementsArray: Element[] =
        Array.from(userSelectedElements);
      const rightSelectedElementsArray: Element[] = Array.from(
        rightSelectedElements
      );

      this.compareAnswers(
        userSelectedElementsArray,
        rightSelectedElementsArray
      );

      this.refreshAnimation();
    }
  }

  private compareAnswers(
    userSelectedElementsArray: Element[],
    rightSelectedElementsArray: Element[]
  ): void {
    if (
      userSelectedElementsArray.length !== rightSelectedElementsArray.length
    ) {
      this.contentFieldsElement.classList.add(CSS_CLASSES.onWrongAnswer);
    } else {
      const checkedArr: Element[] = userSelectedElementsArray.filter((el) =>
        rightSelectedElementsArray.includes(el)
      );
      if (checkedArr.length === userSelectedElementsArray.length) {
        this.htmlView
          .getContentFieldWrapElement()
          .classList.add(CSS_CLASSES.onRightAnswer);
        this.setNewLevel();
      } else {
        this.contentFieldsElement.classList.add(CSS_CLASSES.onWrongAnswer);
      }
    }
  }

  private setNewLevel(): void {
    const index: string = state.getLevelIndex();
    let newIndex: number = +index + 1;
    if (newIndex >= LEVELS_DATA.length) {
      newIndex = 0;
      this.setLevelContent(newIndex);
    } else {
      this.setLevelContent(newIndex);
    }
  }

  private setLevelContent(newIndex: number): void {
    state.setCurrentLevelIndex(`${newIndex}`);
    const targetLinkCreator: IElementCreator | undefined = this.levelsView
      .getLinkElements()
      .find((el) => {
        const element: HTMLElement = el.getElement();
        if (!element) {
          throw new Error();
        }
        return element.dataset.index === `${newIndex}`;
      });
    const targetLinkElement: HTMLElement | undefined =
      targetLinkCreator?.getElement();
    if (targetLinkElement) {
      this.levelsView.setSelectedLink(targetLinkElement);
    }
    this.htmlView.setContent(LEVELS_DATA[newIndex].htmlCode);
    this.levelsView.setLevelRightAnswer(LEVELS_DATA[newIndex].help);
    this.cssView.setContent(LEVELS_DATA[newIndex].help);
    this.tableView.setContent(
      LEVELS_DATA[newIndex].codeForTable,
      LEVELS_DATA[newIndex].help
    );
  }

  private refreshAnimation(): void {
    const htmlViewElement: HTMLElement =
      this.htmlView.getContentFieldWrapElement();
    const { contentFieldsElement } = this;

    contentFieldsElement.addEventListener("animationend", () => {
      contentFieldsElement.classList.remove(CSS_CLASSES.onWrongAnswer);
    });
    htmlViewElement.addEventListener("animationend", () => {
      htmlViewElement.classList.remove(CSS_CLASSES.onRightAnswer);
    });
  }
}
