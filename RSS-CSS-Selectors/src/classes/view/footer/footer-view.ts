import "./footer.css";
import ElementCreator from "../../util/element-creator/element-creator";
import { IElementCreatorParam } from "../../util/element-creator/element-creator-types";
import { View } from "../view";
import { LinkCreator } from "../../util/link-creator/link-creator";
import { ILinkCreatorParams } from "../../util/link-creator/link-creator-types";

const CSS_CLASSES = {
  footer: ["footer"],
  gitHubLogo: ["github_logo"],
  applicationYear: ["year"],
  rssLogo: ["rs-school_logo"],
};

const TEXT_CONTENT = {
  applicationYear: "2023",
};

const LINKS = {
  gitHub: "https://github.com/toronto-tokyo",
  rssSchool: "https://rs.school/js/",
};

export class FooterView extends View {
  constructor() {
    const footerParam: IElementCreatorParam = {
      tag: "footer",
      cssClasses: CSS_CLASSES.footer,
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
      href: LINKS.gitHub,
      target: "_blank",
      cssClass: CSS_CLASSES.gitHubLogo,
    };
    const gitHubLinkCreator = new LinkCreator(gitHubLinkParams);
    const gitHubLinkElement = gitHubLinkCreator.getLinkElement();
    this.viewElement.addInnerElement(gitHubLinkElement);
  }

  private addApplicationYear(): void {
    const applicationYearParams: IElementCreatorParam = {
      tag: "div",
      textContent: TEXT_CONTENT.applicationYear,
      cssClasses: CSS_CLASSES.applicationYear,
      callback: null,
    };
    const applicationYearCreator = new ElementCreator(applicationYearParams);
    const applicationYearElement = applicationYearCreator.getElement();
    this.viewElement.addInnerElement(applicationYearElement);
  }

  private addRSSLinkElement(): void {
    const rssLinkParams: ILinkCreatorParams = {
      href: LINKS.rssSchool,
      target: "_blank",
      cssClass: CSS_CLASSES.rssLogo,
    };
    const rssLinkCreator = new LinkCreator(rssLinkParams);
    const rssLinkElement = rssLinkCreator.getLinkElement();
    this.viewElement.addInnerElement(rssLinkElement);
  }
}
