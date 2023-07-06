import "./table.css";
import ElementCreator from "../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";
import { ICodeForTable } from "../../../../data/levels-data-types";
import { View } from "../../view";
import { clearWrapperElement } from "../functions";
import { animateTargetElements, createContent } from "./table-view-functions";

const CSS_CLASSES = ["table"];
const CSS_CLASSES_TABLE_SURFACE = ["table__surface"];
const CSS_CLASSES_TABLE_SIDE = ["table__side"];

export class TableView extends View {
  private tableSurface: IElementCreator | null;

  constructor() {
    const headerParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES,
      textContent: "",
      callback: null,
    };
    super(headerParam);
    this.tableSurface = null;
    this.configureView();
  }

  public getTableSurface(): HTMLElement | null {
    const element = this.tableSurface?.getElement();
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
    const tableSurfaceElement = this.tableSurface.getElement();
    clearWrapperElement(tableSurfaceElement);
    content.forEach((item: ICodeForTable) => {
      const itemElement = createContent(item);
      if (typeof itemElement !== "string") {
        this.tableSurface?.addInnerElement(itemElement);
      }
    });
    animateTargetElements(tableSurfaceElement, targetElementsSelector);
  }

  private addTableSurfaceElement(): void {
    const tableSurfaceParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_TABLE_SURFACE,
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
      cssClasses: CSS_CLASSES_TABLE_SIDE,
      textContent: "",
      callback: null,
    };
    const tableSide = new ElementCreator(tableSideParam);
    this.viewElement.addInnerElement(tableSide);
  }
}
