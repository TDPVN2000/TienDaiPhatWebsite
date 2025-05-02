export enum TokenType {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
}

export enum ErrorCode {
  UNAUTHORIZED = 'Unauthorized',
}

export enum ResponseStatus {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
}

export enum DebounceTime {
  DEFAULT = 500,
}

export enum DateTimeFormat {
  DATE_TIME = 'DD/MM/YYYY HH:mm',
  DATE = 'DD/MM/YYYY',
  DATE_REVERSE = 'YYYY/MM/DD',
}

export enum LanguageType {
  JA = 'ja',
  EN = 'en',
  KEY = 'cimode',
  VI = 'vi',
}

export enum LocalStorageKey {
  I18 = 'i18nextLng',
}

export enum CookieKey {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
}

export enum QueryKey {
  PROFILE = 'profile',
  SHOW_SIDE_NAV = 'showSideNav',
}

export enum AppEnv {
  PROD = 'prod',
}

export enum StorageType {
  LOCAL_STORAGE = 'localStorage',
  SESSION_STORAGE = 'sessionStorage',
}
