export class LocalStorageService {
  static setItem(key: string, value: any, removeIfEmpty = true): void {
    if (removeIfEmpty && (value === null || value === undefined)) {
      return localStorage.removeItem(key);
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: string, otherwise?: any): any {
    const data = localStorage.getItem(key);

    if (data !== null) {
      return JSON.parse(data);
    }

    if (otherwise !== undefined) {
      return otherwise;
    }

    return null;
  }
}
