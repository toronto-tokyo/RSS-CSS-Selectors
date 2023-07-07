import { loadLevelIndex } from "./functions";

class State {
  private levelIndex: string;

  constructor() {
    this.levelIndex = loadLevelIndex();

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
