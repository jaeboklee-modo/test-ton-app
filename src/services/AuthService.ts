import { LocalStorageService } from "./LocalStorageService";

const accessTokenName = "accessToken";
const refreshTokenName = "refreshToken";

export class AuthService {
  static setCredentials(credentials: {
    accessToken: string;
    refreshToken: string;
  }): void {
    LocalStorageService.setItem(accessTokenName, credentials.accessToken);
    LocalStorageService.setItem(refreshTokenName, credentials.refreshToken);
  }

  static getCredentials(): {
    accessToken: string | null;
    refreshToken: string | null;
  } {
    return {
      accessToken: LocalStorageService.getItem(accessTokenName, null),
      refreshToken: LocalStorageService.getItem(refreshTokenName, null),
    };
  }

  static isAuth(): boolean {
    return !!AuthService.getCredentials().accessToken;
  }

  static clearCredentials(): void {
    LocalStorageService.setItem(accessTokenName, null);
    LocalStorageService.setItem(refreshTokenName, null);
  }
}
