import { TableView } from "./table/table-view";
import { CssView } from "./css-view/css-view";
import { HTMLView } from "./html-view/html-view";
import { LevelsView } from "./levels-view/level-view";
import { LEVELS_DATA } from "../../../data/lelels-data";
import { state } from "../../state/state";

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
    this.checkSelector();
  }

  private setSelectedLevelAfterLoad(): void {
    window.addEventListener("load", () => {
      const loadedIndex = state.getLevelIndex();
      this.setLevelContent(+loadedIndex);
    });
  }

  private checkSelectorOnElement(): void {
    const enterButton = this.cssView.getEnterButton();
    if (enterButton) {
      enterButton.addEventListener("click", () => {
        this.checkSelector();
      });
    }
  }

  private checkSelectorOnKeyBoardKey(): void {
    window.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.checkSelector();
      }
    });
  }

  private checkSelector(): void {
    const tableSurfaceElement = this.tableView.getTableSurface();
    const inputFieldElement = this.cssView.getInputFieldElement();
    if (!tableSurfaceElement || !inputFieldElement) {
      throw new Error();
    }
    const inputFieldValue = inputFieldElement.value;
    const rightSelector = this.levelsView.getLevelRightAnswer();

    if (inputFieldValue.length && rightSelector) {
      const userSelectedElements = tableSurfaceElement.querySelectorAll(
        `${inputFieldValue}`
      );
      const rightSelectedElements = tableSurfaceElement.querySelectorAll(
        `${rightSelector}`
      );
      const userSelectedElementsArray = Array.from(userSelectedElements);
      const rightSelectedElementsArray = Array.from(rightSelectedElements);

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
      this.contentFieldsElement.classList.add("wrong-answer__fields");
    } else {
      const checkedArr = userSelectedElementsArray.filter((el) =>
        rightSelectedElementsArray.includes(el)
      );
      if (checkedArr.length === userSelectedElementsArray.length) {
        this.htmlView
          .getContentFieldWrapElement()
          .classList.add("html-view--active");
        this.setNewLevel();
      } else {
        this.contentFieldsElement.classList.add("wrong-answer__fields");
      }
    }
  }

  private setNewLevel(): void {
    const index = state.getLevelIndex();
    let newIndex = +index + 1;
    if (newIndex >= LEVELS_DATA.length) {
      newIndex = 0;
      this.setLevelContent(newIndex);
      alert("You woon");
    } else {
      this.setLevelContent(newIndex);
    }
  }

  private setLevelContent(newIndex: number): void {
    state.setCurrentLevelIndex(`${newIndex}`);
    const targetLinkCreator = this.levelsView.getLinkElements().find((el) => {
      const element = el.getElement();
      if (!element) {
        throw new Error();
      }
      return element.dataset.index === `${newIndex}`;
    });
    const targetLinkElement = targetLinkCreator?.getElement();
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
    const htmlViewElement = this.htmlView.getContentFieldWrapElement();
    const { contentFieldsElement } = this;

    contentFieldsElement.addEventListener("animationend", () => {
      contentFieldsElement.classList.remove("wrong-answer__fields");
    });
    htmlViewElement.addEventListener("animationend", () => {
      htmlViewElement.classList.remove("html-view--active");
    });
  }
}
