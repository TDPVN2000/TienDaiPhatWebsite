import { TokenType } from "constants/enums";
import Cookies from "js-cookie";

const EXPIRES = 30;

const setItem = (key: string, value: string) => {
  Cookies.set(key, value, {
    expires: EXPIRES,
    path: "/",
  });
};

const getItem = (key: string) => {
  return Cookies.get(key);
};

const removeItem = (key: string) => {
  Cookies.remove(key, { path: "/" });
};

const setToken = (value: string) => {
  setItem(TokenType.TOKEN, value);
};

const getToken = () => {
  return getItem(TokenType.TOKEN);
};

const clearToken = () => {
  removeItem(TokenType.TOKEN);
};

const setRefreshToken = (value: string) => {
  setItem(TokenType.REFRESH_TOKEN, value);
};

const getRefreshToken = () => {
  return getItem(TokenType.REFRESH_TOKEN);
};

const clearRefreshToken = () => {
  removeItem(TokenType.REFRESH_TOKEN);
};

const storage = {
  setToken,
  getToken,
  clearToken,
  setRefreshToken,
  getRefreshToken,
  clearRefreshToken,
  setItem,
  getItem,
  removeItem,
};
export default storage;
