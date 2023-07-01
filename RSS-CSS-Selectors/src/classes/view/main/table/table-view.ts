import "./table.css";
import ElementCreator from "../../../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../../../util/element-creator/element-creator-types";

const CSS_CLASSES = ["table"];
const CSS_CLASSES_TABLE_SURFACE = ["table__surface"];
const CSS_CLASSES_TABLE_SIDE = ["table__side"];

export class TableView {
  private element: IElementCreator;

  constructor() {
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

  private configureView(): void {
    const tableSurfaceParam: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES_TABLE_SURFACE,
      textContent: "",
      callback: null,
    };
    const tableSurface = new ElementCreator(tableSurfaceParam);
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
}
