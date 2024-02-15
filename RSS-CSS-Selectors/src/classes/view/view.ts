import ElementCreator from "@element-creator/element-creator";
import { IElementCreatorParam } from "@element-creator/element-creator-types";

export abstract class View {
  public viewElement: ElementCreator;

  constructor(params: IElementCreatorParam) {
    this.viewElement = new ElementCreator(params);
  }

  public getViewElement(): HTMLElement {
    return this.viewElement.getElement();
  }

  protected abstract configureView(): void;
}
