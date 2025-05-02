import { message } from 'antd';
import moment from 'moment';
import i18next from 'i18next';
import _ from 'lodash';
import { ComponentType, lazy } from 'react';

import configs from 'constants/config';
import { DateTimeFormat } from 'constants/enum';

//Handle error
export const handleErrorMessage = (error: any) => {
  message.destroy();
  message.error(getErrorMessage(error));
  if (configs.APP_ENV !== 'prod') {
    console.log(error);
  }
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.errorMessage || i18next.t('common.error');
};

//Image
export const getBase64 = (img: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });

//Table
export const getIndexTable = (
  pageIndex: number,
  pageSize: number,
  current: number
) => {
  return (pageIndex - 1) * pageSize + current + 1;
};

//Date time
export const convertTimeToLocal = (time?: string, format?: string) => {
  if (!time) return '';
  return moment(time)
    .format(format || DateTimeFormat.DATE_TIME)
    .toString();
};

//Format text
export const trimText = (str?: string) => {
  if (!str) return '';
  return str.trim().replace(/\s+/gm, ' ');
};

export const formatNumberToJp = (number: number) => {
  return number?.toLocaleString('ja-JP') || '';
};

//Lazy component
export const lazyMinLoadTime = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  minLoadTimeMs = 1000
) =>
  lazy(() =>
    Promise.all([
      factory(),
      new Promise((resolve) => setTimeout(resolve, minLoadTimeMs)),
    ]).then(([moduleExports]) => moduleExports)
  );
