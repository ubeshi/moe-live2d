export function getRange(count: number): number[] {
  if (count <= 0) {
    return [];
  }
  return [...Array(count).keys()];
}
