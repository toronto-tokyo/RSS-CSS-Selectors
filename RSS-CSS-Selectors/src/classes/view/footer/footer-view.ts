import "./footer.css";
import ElementCreator from "../../util/element-creator/element-creator";
import { IElementCreatorParam } from "../../util/element-creator/element-creator-types";
import { View } from "../view";
import { LinkCreator } from "../../util/link-creator/link-creator";
import { ILinkCreatorParams } from "../../util/link-creator/link-creator-types";

const CSS_CLASSES = ["footer"];
const CSS_CLASSES_GITHUB = ["github_logo"];
const CSS_CLASSES_APPLICATION_YEAR = ["year"];
const CSS_CLASSES_RSS = ["rs-school_logo"];

const APPLICATION_YEAR = "2023";

export class FooterView extends View {
  constructor() {
    const footerParam: IElementCreatorParam = {
      tag: "footer",
      cssClasses: CSS_CLASSES,
      textContent: "",
      callback: null,
    };
    super(footerParam);
    this.configureView();
  }

  protected configureView(): void {
    this.addGitHubLinkElement();
    this.addApplicationYear();
    this.addRSSLinkElement();
  }

  private addGitHubLinkElement(): void {
    const gitHubLinkParams: ILinkCreatorParams = {
      href: "https://github.com/toronto-tokyo",
      target: "_blank",
      cssClass: CSS_CLASSES_GITHUB,
    };
    const gitHubLinkCreator = new LinkCreator(gitHubLinkParams);
    const gitHubLinkElement = gitHubLinkCreator.getLinkElement();
    this.viewElement.addInnerElement(gitHubLinkElement);
  }

  private addApplicationYear(): void {
    const applicationYearParams: IElementCreatorParam = {
      tag: "div",
      textContent: APPLICATION_YEAR,
      cssClasses: CSS_CLASSES_APPLICATION_YEAR,
      callback: null,
    };
    const applicationYearCreator = new ElementCreator(applicationYearParams);
    const applicationYearElement = applicationYearCreator.getElement();
    this.viewElement.addInnerElement(applicationYearElement);
  }

  private addRSSLinkElement(): void {
    const rssLinkParams: ILinkCreatorParams = {
      href: "https://rs.school/js/",
      target: "_blank",
      cssClass: CSS_CLASSES_RSS,
    };
    const rssLinkCreator = new LinkCreator(rssLinkParams);
    const rssLinkElement = rssLinkCreator.getLinkElement();
    this.viewElement.addInnerElement(rssLinkElement);
  }
}