function loadLevelNameState(): string {
  const storageLvlIndex = localStorage.getItem("level-index");
  if (storageLvlIndex) {
    return storageLvlIndex;
  }
  return "0";
}

class State {
  private levelIndex: string;

  constructor() {
    this.levelIndex = loadLevelNameState();

    window.addEventListener("beforeunload", this.saveLvlIndexState.bind(this));
  }

  public getLevelIndex(): string {
    return this.levelIndex;
  }

  public setCurrentLevelIndex(value: string | undefined): void {
    if (value) {
      this.levelIndex = value;
    }
  }

  private saveLvlIndexState(): void {
    localStorage.setItem("level-index", this.levelIndex);
  }
}

export const state = new State();
