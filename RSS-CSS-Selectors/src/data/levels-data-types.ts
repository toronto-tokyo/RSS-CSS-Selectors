export interface ILevel {
  title: string;
  help: string;
  htmlCode: string;
  codeForTable: ICodeForTable[];
}

export interface ISelectors {
  elementClass?: string;
  elementId?: string;
}

export interface ICodeForTable {
  bread?: {
    selectors: ISelectors | null;
    next: ICodeForTable | null;
  };
  cheese?: {
    selectors: ISelectors | null;
    next: ICodeForTable | null;
  };
  ham?: {
    selectors: ISelectors | null;
    next: ICodeForTable | null;
  };
}
