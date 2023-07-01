export interface ICallbackParams {
  event: string;
  callback(event: Event): void;
}

export interface IElementCreatorParam {
  tag: string;
  cssClasses: string[];
  textContent: string;
  callback: ICallbackParams | null;
}

export interface IElementCreator {
  addInnerElement(innerElement: HTMLElement | IElementCreator): void;
  getElement(): HTMLElement | null;
}
