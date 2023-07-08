import { BreadView } from "./custom-tags/bread-view/bread-view";
import { CheeseView } from "./custom-tags/cheese-view/cheese-view";
import { HamView } from "./custom-tags/ham-view/ham-view";
import { ICodeForTable } from "../../../../data/levels-data-types";

export function animateTargetElements(
  wrapperElement: HTMLElement,
  targetElementsSelector: string
): void {
  const rightSelectedElements: NodeListOf<Element> =
    wrapperElement.querySelectorAll(`${targetElementsSelector}`);
  const keys: string[] = Object.keys(rightSelectedElements);
  keys.forEach((key): void => {
    const htmlElement: HTMLElement = rightSelectedElements[+key] as HTMLElement;
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
