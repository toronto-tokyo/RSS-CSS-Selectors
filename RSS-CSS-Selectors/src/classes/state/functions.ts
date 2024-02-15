export function loadLevelIndex(): string {
  const storageLvlIndex = localStorage.getItem("level-index");
  if (storageLvlIndex) {
    return storageLvlIndex;
  }
  return "0";
}
