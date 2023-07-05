import {
  IElementCreatorParam,
  ICallbackParams,
  IElementCreator,
} from "./element-creator-types";

export default class ElementCreator implements IElementCreator {
  private element: HTMLElement;

  constructor(params: IElementCreatorParam) {
    this.element = this.createElement(params);
  }

  public addInnerElement(innerElement: ElementCreator | HTMLElement): void {
    if (innerElement instanceof ElementCreator) {
      const element: HTMLElement = innerElement.getElement();
      this.element.append(element);
    } else {
      this.element.append(innerElement);
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public createElement(params: IElementCreatorParam): HTMLElement {
    this.element = document.createElement(params.tag);
    this.setCssSelectors(params.cssClasses);
    this.setTextContent(params.textContent);
    this.setCallback(params.callback);
    return this.element;
  }

  private setCssSelectors(cssSelectors: string[]): void {
    this.element.classList.add(...cssSelectors);
  }

  private setTextContent(text: string): void {
    this.element.textContent = text;
  }

  private setCallback(arg: ICallbackParams | null): void {
    if (arg) {
      const { event, callback } = arg;
      this.element.addEventListener(event, (e: Event) => callback(e));
    }
  }
}
