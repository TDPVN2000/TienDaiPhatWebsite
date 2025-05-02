import { StorageType } from 'constants/enum';

const setItem = (key: string, value: any, type: StorageType) => {
  if (type === StorageType.LOCAL_STORAGE) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  if (type === StorageType.SESSION_STORAGE) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

const getItem = (key: string, type: StorageType) => {
  if (type === StorageType.LOCAL_STORAGE) {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch {
      return localStorage.getItem(key) || '';
    }
  }
  if (type === StorageType.SESSION_STORAGE) {
    try {
      return JSON.parse(sessionStorage.getItem(key) || 'null');
    } catch {
      return sessionStorage.getItem(key) || '';
    }
  }
  return '';
};

const removeItem = (key: string, type: StorageType) => {
  if (type === StorageType.LOCAL_STORAGE) {
    localStorage.removeItem(key);
  }
  if (type === StorageType.SESSION_STORAGE) {
    sessionStorage.removeItem(key);
  }
};

const storage = {
  setItem,
  getItem,
  removeItem,
};
export default storage;
