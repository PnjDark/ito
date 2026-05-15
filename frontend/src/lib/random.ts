export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFromArray<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function weightedRandom<T>(items: T[], weights: number[]) {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) {
      return items[i];
    }
  }
  return items[items.length - 1];
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
