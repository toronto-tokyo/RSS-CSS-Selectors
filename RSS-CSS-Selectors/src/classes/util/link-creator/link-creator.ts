import { ILinkCreatorParams } from "@link-creator/link-creator-types";

export class LinkCreator {
  private linkElement: HTMLAnchorElement;

  constructor(param: ILinkCreatorParams) {
    this.linkElement = document.createElement("a");
    this.configureLink(param);
  }

  public getLinkElement(): HTMLAnchorElement {
    return this.linkElement;
  }

  private configureLink(param: ILinkCreatorParams): void {
    this.setLink(param.href);
    this.setTargetAttribute(param.target);
    this.setCssSelectors(param.cssClass);
  }

  private setLink(link: string): void {
    this.linkElement.href = link;
  }

  private setTargetAttribute(targetAttributeValue: string): void {
    this.linkElement.target = targetAttributeValue;
  }

  private setCssSelectors(cssSelectors: string[]): void {
    this.linkElement.classList.add(...cssSelectors);
  }
}
