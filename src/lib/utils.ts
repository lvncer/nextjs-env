/**
 * 文字列を大文字に変換する関数
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 配列をシャッフルする関数
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 数値の配列から平均値を計算する関数
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * メールアドレスの形式をチェックする関数
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * URLのパラメータを解析する関数
 */
export function parseUrlParams(url: string): { [key: string]: string } {
  try {
    const urlObj = new URL(url);
    const params: { [key: string]: string } = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch {
    return {};
  }
}

/**
 * 配列から重複を除去する関数
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * 文字列をケバブケースに変換する関数
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}
