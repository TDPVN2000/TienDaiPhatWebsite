import Cookies from 'js-cookie';

import { CookieKey } from 'constants/enum';

const EXPIRES = 1;

const setCookieData = (key: string, value: string) => {
  Cookies.set(key, value, {
    expires: EXPIRES,
    path: '/',
  });
};

const getCookieData = (key: string) => {
  return Cookies.get(key);
};

const clearCookieData = (key: CookieKey) => {
  Cookies.remove(key, { path: '/' });
};

const setItem = (key: CookieKey, value: any) => {
  setCookieData(key, JSON.stringify(value));
};

const getItem = (key: CookieKey) => {
  return JSON.parse(getCookieData(key) || 'null');
};

const removeItem = (key: CookieKey) => {
  clearCookieData(key);
};

const cookie = {
  setItem,
  getItem,
  removeItem,
};
export default cookie;
