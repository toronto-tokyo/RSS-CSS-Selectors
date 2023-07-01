import {
  IElementCreatorParam,
  ICallbackParams,
  IElementCreator,
} from "./element-creator-types";

export default class ElementCreator implements IElementCreator {
  private element: HTMLElement | null;

  constructor(params: IElementCreatorParam) {
    this.element = null;
    this.createElement(params);
  }

  public addInnerElement(innerElement: ElementCreator | HTMLElement): void {
    if (!this.element) {
      throw new Error("new");
    }
    if (innerElement instanceof ElementCreator) {
      const element: HTMLElement | null = innerElement.getElement();
      if (element) {
        this.element.append(element);
      }
    } else {
      this.element.append(innerElement);
    }
  }

  public getElement(): HTMLElement | null {
    return this.element;
  }

  public createElement(params: IElementCreatorParam): void {
    this.element = document.createElement(params.tag);
    this.setCssSelectors(params.cssClasses);
    this.setTextContent(params.textContent);
    this.setCallback(params.callback);
  }

  private setCssSelectors(cssSelectors: string[]): void {
    if (this.element) {
      this.element.classList.add(...cssSelectors);
    }
  }

  private setTextContent(text: string): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  private setCallback(arg: ICallbackParams | null): void {
    if (arg) {
      const { event, callback } = arg;
      if (!this.element) {
        throw new Error("new");
      }
      if (event) {
        this.element.addEventListener(event, (e) => callback(e));
      }
    }
  }
}
