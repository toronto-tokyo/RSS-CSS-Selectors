import "./footer.css";
import ElementCreator from "../../util/element-creator/element-creator";
import {
  IElementCreatorParam,
  IElementCreator,
} from "../../util/element-creator/element-creator-types";

const CSS_CLASSES = ["footer"];
export class FooterView {
  private element: IElementCreator;

  constructor() {
    const footerParam: IElementCreatorParam = {
      tag: "footer",
      cssClasses: CSS_CLASSES,
      textContent: "",
      callback: null,
    };

    this.element = new ElementCreator(footerParam);
    this.configureView();
  }

  public getElement(): HTMLElement | null {
    return this.element.getElement();
  }

  private configureView(): void {
    const gitHubLinkElem = document.createElement("a");
    gitHubLinkElem.href = "https://github.com/toronto-tokyo";
    gitHubLinkElem.target = "_blank";
    gitHubLinkElem.classList.add("github_logo");

    const textElem = document.createElement("div");
    textElem.className = "year";
    textElem.textContent = "2023";

    const linkElem = document.createElement("a");
    linkElem.href = "https://rs.school/js/";
    gitHubLinkElem.target = "_blank";
    linkElem.classList.add("rs-school_logo");

    this.element.addInnerElement(gitHubLinkElem);
    this.element.addInnerElement(textElem);
    this.element.addInnerElement(linkElem);
  }
}
