import "./app.css";
import ElementCreator from "../util/element-creator/element-creator";
import {
  IElementCreator,
  IElementCreatorParam,
} from "../util/element-creator/element-creator-types";
import { HeaderView } from "../view/header/header-view";
import { FooterView } from "../view/footer/footer-view";
import { MainView } from "../view/main/main-view";

const CSS_CLASSES = {
  appWrapper: ["wrapper"],
};
export class App {
  private wrapper: IElementCreator;

  constructor() {
    const wrapperParams: IElementCreatorParam = {
      tag: "div",
      cssClasses: CSS_CLASSES.appWrapper,
      textContent: "",
      callback: null,
    };
    this.wrapper = new ElementCreator(wrapperParams);
  }

  public createView(): void {
    const header: HeaderView = new HeaderView();
    const headerElement: HTMLElement = header.getViewElement();
    const footer: FooterView = new FooterView();
    const footerElement: HTMLElement = footer.getViewElement();
    const main: MainView = new MainView();
    const mainElement: HTMLElement = main.getViewElement();

    this.wrapper.addInnerElement(headerElement);
    this.wrapper.addInnerElement(mainElement);
    this.wrapper.addInnerElement(footerElement);

    const wrapperElement: HTMLElement = this.wrapper.getElement();
    document.body.append(wrapperElement);
  }
}
