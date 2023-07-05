import "./table.css";
import ElementCreator from "../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";
import { BreadView } from "./bread-view/bread-view";
import { CheeseView } from "./cheese-view/cheese-view";
import { HamView } from "./ham-view/ham-view";
import { ICodeForTable } from "../../../../data/levels-data-types";

const CSS_CLASSES = ["table"];
const CSS_CLASSES_TABLE_SURFACE = ["table__surface"];
const CSS_CLASSES_TABLE_SIDE = ["table__side"];

function myFn(content: ICodeForTable | null): HTMLElement | string {
  if (content === null) return "";
  const key = Object.keys(content);
  let newTag: HTMLElement = document.createElement("div");
  if (key[0] === "bread") {
    const a = content[key[0]];
    if (a) {
      newTag = new BreadView(a.selectors?.elementClass, a.selectors?.elementId);
      newTag.append(myFn(a.next));
    }
  }
  if (key[0] === "cheese") {
    const a = content[key[0]];
    if (a) {
      newTag = new CheeseView(
        a.selectors?.elementClass,
        a.selectors?.elementId
      );
      newTag.append(myFn(a.next));
    }
  }
  if (key[0] === "ham") {
    const a = content[key[0]];
    if (a) {
      newTag = new HamView(a.selectors?.elementClass, a.selectors?.elementId);
      newTag.append(myFn(a.next));
    }
  }
  return newTag;
}

export class TableView {
  private element: IElementCreator;

  private tableSurface: IElementCreator | null;

  constructor() {
    this.tableSurface = null;
    const headerParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES,
      textContent: "",
      callback: null,
    };

    this.element = new ElementCreator(headerParam);
    this.configureView();
  }

  public getElement(): HTMLElement | null {
    return this.element.getElement();
  }

  public getTableSurface(): HTMLElement | null {
    const element = this.tableSurface?.getElement();
    if (element) {
      return element;
    }
    return null;
  }

  private configureView(): void {
    const tableSurfaceParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_TABLE_SURFACE,
      textContent: "",
      callback: null,
    };
    const tableSurface = new ElementCreator(tableSurfaceParam);
    this.tableSurface = tableSurface;
    this.element.addInnerElement(tableSurface);

    const tableSideParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_TABLE_SIDE,
      textContent: "",
      callback: null,
    };
    const tableSide = new ElementCreator(tableSideParam);
    this.element.addInnerElement(tableSide);
  }

  public setContent(
    content: ICodeForTable[],
    targetElementSelector: string
  ): void {
    if (!this.tableSurface) {
      throw new Error();
    }
    const element = this.tableSurface.getElement();
    while (element?.firstElementChild) {
      element.firstElementChild.remove();
    }
    content.forEach((item: ICodeForTable) => {
      const itemElement = myFn(item);
      if (typeof itemElement !== "string") {
        this.tableSurface?.addInnerElement(itemElement);
      }
    });
    if (element) {
      const rightSelectedElements = element.querySelectorAll(
        `${targetElementSelector}`
      );
      const keys = Object.keys(rightSelectedElements);
      keys.forEach((key): void => {
        const htmlElement = rightSelectedElements[+key] as HTMLElement;
        htmlElement.dataset.class = "target";
      });
    }
  }
}
