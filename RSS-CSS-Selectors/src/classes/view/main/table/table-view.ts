import "./table.css";
import ElementCreator from "@element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "@element-creator/element-creator-types";
import { ICodeForTable } from "@levels-data/levels-data-types";
import { View } from "@view/view";
import { clearWrapperElement } from "@main-view/functions";
import {
  animateTargetElements,
  createContent,
} from "@table-view/table-view-functions";

const CSS_CLASSES = {
  table: ["table"],
  tableSurface: ["table__surface"],
  tableSide: ["table__side"],
};

export class TableView extends View {
  private tableSurface: IElementCreator | null;

  constructor() {
    const headerParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.table,
      textContent: "",
      callback: null,
    };
    super(headerParam);
    this.tableSurface = null;
    this.configureView();
  }

  public getTableSurface(): HTMLElement | null {
    const element: HTMLElement | undefined = this.tableSurface?.getElement();
    if (element) {
      return element;
    }
    return null;
  }

  protected configureView(): void {
    this.addTableSurfaceElement();
    this.addTableSideElement();
  }

  public setContent(
    content: ICodeForTable[],
    targetElementsSelector: string
  ): void {
    if (!this.tableSurface) {
      throw new Error();
    }
    const tableSurfaceElement: HTMLElement = this.tableSurface.getElement();
    clearWrapperElement(tableSurfaceElement);
    content.forEach((item: ICodeForTable) => {
      const itemElement: string | HTMLElement = createContent(item);
      if (typeof itemElement !== "string") {
        this.tableSurface?.addInnerElement(itemElement);
      }
    });
    animateTargetElements(tableSurfaceElement, targetElementsSelector);
  }

  private addTableSurfaceElement(): void {
    const tableSurfaceParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.tableSurface,
      textContent: "",
      callback: null,
    };
    const tableSurface = new ElementCreator(tableSurfaceParam);
    this.tableSurface = tableSurface;
    this.viewElement.addInnerElement(tableSurface);
  }

  private addTableSideElement(): void {
    const tableSideParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.tableSide,
      textContent: "",
      callback: null,
    };
    const tableSide = new ElementCreator(tableSideParam);
    this.viewElement.addInnerElement(tableSide);
  }
}
