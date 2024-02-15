import "./footer.css";
import ElementCreator from "@element-creator/element-creator";
import { IElementCreatorParam } from "@element-creator/element-creator-types";
import { View } from "@view/view";
import { LinkCreator } from "@link-creator/link-creator";
import { ILinkCreatorParams } from "@link-creator/link-creator-types";

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
    const gitHubLinkCreator: LinkCreator = new LinkCreator(gitHubLinkParams);
    const gitHubLinkElement: HTMLAnchorElement =
      gitHubLinkCreator.getLinkElement();
    this.viewElement.addInnerElement(gitHubLinkElement);
  }

  private addApplicationYear(): void {
    const applicationYearParams: IElementCreatorParam = {
      tag: "div",
      textContent: TEXT_CONTENT.applicationYear,
      cssClasses: CSS_CLASSES.applicationYear,
      callback: null,
    };
    const applicationYearCreator: ElementCreator = new ElementCreator(
      applicationYearParams
    );
    const applicationYearElement: HTMLElement =
      applicationYearCreator.getElement();
    this.viewElement.addInnerElement(applicationYearElement);
  }

  private addRSSLinkElement(): void {
    const rssLinkParams: ILinkCreatorParams = {
      href: LINKS.rssSchool,
      target: "_blank",
      cssClass: CSS_CLASSES.rssLogo,
    };
    const rssLinkCreator: LinkCreator = new LinkCreator(rssLinkParams);
    const rssLinkElement: HTMLAnchorElement = rssLinkCreator.getLinkElement();
    this.viewElement.addInnerElement(rssLinkElement);
  }
}
