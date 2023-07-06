import { BreadView } from "./bread-view/bread-view";
import { CheeseView } from "./cheese-view/cheese-view";
import { HamView } from "./ham-view/ham-view";
import { ICodeForTable } from "../../../../data/levels-data-types";

export function animateTargetElements(
  wrapperElement: HTMLElement,
  targetElementsSelector: string
): void {
  const rightSelectedElements = wrapperElement.querySelectorAll(
    `${targetElementsSelector}`
  );
  const keys = Object.keys(rightSelectedElements);
  keys.forEach((key): void => {
    const htmlElement = rightSelectedElements[+key] as HTMLElement;
    htmlElement.dataset.class = "target";
  });
}

export function createContent(
  content: ICodeForTable | null
): HTMLElement | string {
  if (content === null) return "";
  const key = Object.keys(content);
  let newTag: HTMLElement = document.createElement("div");
  if (key[0] === "bread") {
    const a = content[key[0]];
    if (a) {
      newTag = new BreadView(a.selectors?.elementClass, a.selectors?.elementId);
      newTag.append(createContent(a.next));
    }
  }
  if (key[0] === "cheese") {
    const a = content[key[0]];
    if (a) {
      newTag = new CheeseView(
        a.selectors?.elementClass,
        a.selectors?.elementId
      );
      newTag.append(createContent(a.next));
    }
  }
  if (key[0] === "ham") {
    const a = content[key[0]];
    if (a) {
      newTag = new HamView(a.selectors?.elementClass, a.selectors?.elementId);
      newTag.append(createContent(a.next));
    }
  }
  return newTag;
}
