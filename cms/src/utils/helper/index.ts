import { message } from "antd";
import { RcFile } from "antd/lib/upload";
import { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";

import configs from "constants/config";

import {
  ClientType,
  DateOption,
  FormatTime,
  LanguageType,
  NotificationTypeSend,
} from "constants/enums";
import { REGEX_IMG, REGEX_URL } from "constants/regex";
import i18n from "i18n/i18n";
import moment from "moment";
import { isArray, isEmpty } from "lodash";
import { ALL_ADDRESS_ID } from "constants/defaultValues";
import { IFilter, IFormatAddressShow } from "constants/interfaces";
import { Parser } from "@json2csv/plainjs";
import { LIMIT_SIZE_IMAGE } from "utils/const/const";
import storage from "./storage";

export const handleErrorMessage = (error: any, needFormatError = true) => {
  message.destroy();
  message.error(needFormatError ? getErrorMessage(error) : error);
  if (configs.APP_ENV !== "prod") {
    console.log(error);
  }
};

export const formatYearMonthDay = (dateString?: string, format?: string) => {
  if (dateString) {
    return dayjs(dateString).format(format || "DD/MM/YYYY");
  }
  return "";
};

export const monthFormat = "YYYY/MM";
export const YYYYMMDD = "YYYY/MM/DD";
export const formatMonthOneDigit = "M 月";
export const formatDayOneDigit = "D 日";
export const formatDate = "DD/MM/YYYY, HH:mm";
export const formatMonthRevenue = "YYYY年MM月";

export const formatDateString = (
  date: Date | string | number,
  defaultFormat?: string
) => {
  if (!date) return "";
  return `${dayjs(date).format(defaultFormat || formatDate)}`;
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.errorMessage || "Something went wrong!";
};

//Table
export const getIndexTable = (
  pageIndex: number,
  pageSize: number,
  current: number
) => {
  return (pageIndex - 1) * pageSize + current + 1;
};

export const convertPhone = (phone: string) => {
  if (!phone) {
    return "";
  }
  return `(+81) ${phone?.slice(0, 3)}-${phone?.slice(3, 6)}-${phone?.slice(6)}`;
};

//Date time
export const convertTimeToLocal = (time?: string, format?: FormatTime) => {
  if (!time) return "";
  switch (i18n.language) {
    case LanguageType.JA:
      return dayjs(time)
        .format(format || FormatTime.DATE_JP)
        .toString();
    default:
      return dayjs(time)
        .format(format || FormatTime.DATE_REVERSE)
        .toString();
  }
};

export const changeLocale = (locale: string) => {
  return dayjs().locale(locale);
};

export const convertTimeToUTC = (
  time?: Dayjs | Moment | null,
  option?: DateOption
) => {
  if (!time) return undefined;
  if (option === DateOption.START_DATE) {
    return time?.startOf("date")?.toISOString();
  }
  if (option === DateOption.END_DATE) {
    return time?.endOf("date")?.toISOString();
  }
  return time?.toISOString();
};

//Format text
export const trimText = (str?: string) => {
  if (!str) return "";
  return str.trim().replace(/\s+/gm, " ");
};

//Base 64
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const checkFileOrigin = (file: any) => {
  return !!file?.originFileObj;
};

export const formatCurrencyJapanese = (
  value: number,
  options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "JPY",
  }
) => {
  return Number(value).toLocaleString("ja-JP", options);
};

export const formatNumberLocale = (value: any) => {
  return Number(value).toLocaleString("ja-JP", {
    style: "decimal",
    maximumFractionDigits: 3,
  });
};
export const replaceWithBr = (haiku: string) => {
  return haiku.replace(/\n/g, "<br />");
};

export const getDeletedByClientType = (clientType?: ClientType | null) => {
  if (!clientType) return "";
  const indexOfS = Object.values(ClientType).indexOf(clientType);
  const key = Object.keys(ClientType)[indexOfS]?.toLocaleLowerCase();
  return key || "";
};

export const isImage = (url: string) => {
  const isValidImage = url.match(REGEX_IMG) !== null;
  return isValidImage;
};

export const getObjectSendNotification = (type: number) => {
  if (type === NotificationTypeSend.ALL) {
    return i18n.t("notifications.typeSend.all");
  }
  if (type === NotificationTypeSend.USER) {
    return i18n.t("notifications.typeSend.user");
  }
  if (type === NotificationTypeSend.STORE) {
    return i18n.t("notifications.typeSend.store");
  }
  if (type === NotificationTypeSend.SHIPPER) {
    return i18n.t("notifications.typeSend.shipper");
  }
  return i18n.t("notifications.typeSend.specifiedUser");
};

export const convertDateToStartEndOfDay = (dateTime: any) => {
  return {
    startDate: moment().startOf(dateTime).toISOString(),
    endDate: moment().endOf(dateTime).toISOString(),
  };
};

export const formatSubCategoryLevel2 = (subCategories = [], level = 2) => {
  const newCategories =
    subCategories?.filter(
      (itemSubCategory: any) => itemSubCategory?.subCategory?.order === level
    ) || [];

  if (newCategories?.length) {
    const subCategoryShow = newCategories
      .map((item: any) => item?.subCategory?.title)
      .join(i18n.t("common.comma"));
    return subCategoryShow;
  }
  return "";
};

export const isChooseAllCountry = ({ districts }: any) => {
  if (!districts?.length || !isArray(districts)) return false;
  const formatDistricts =
    typeof districts?.[0] === "object"
      ? districts?.map((item: any) => item?.id)
      : districts;
  return formatDistricts.includes(ALL_ADDRESS_ID);
};

export const addProvinceToDistrictsProfile = ({
  districts,
  provinces,
}: {
  districts: any;
  provinces: any;
}) => {
  const newDistricts = districts?.map((districtItem: any) => {
    return {
      ...districtItem,
      province:
        provinces.find(
          (provinceItem: any) => provinceItem.id === districtItem?.provinceId
        ) || {},
    };
  });
  return newDistricts;
};

export const formatAddressShow = (params?: IFormatAddressShow) => {
  const {
    countries = [],
    initAddress,
    commaLng = "common.comma",
    spaceLng = "common.dot",
    maxShow,
    provinces = [],
  } = params || {};

  if (isChooseAllCountry({ districts: initAddress })) {
    return countries
      .map((countryItem: any) => countryItem.name)
      .join(i18n.t(commaLng));
  }
  if (!isArray(initAddress)) return "";
  let newAddress = [...initAddress];
  if (initAddress) {
    newAddress = maxShow ? initAddress?.slice(0, maxShow) : initAddress;
  }
  const newDistricts = addProvinceToDistrictsProfile({
    districts: newAddress,
    provinces,
  });
  if (newDistricts?.length) {
    const addressShow = newDistricts
      .map(
        (item: any) =>
          `${item?.province?.name || ""}${
            item?.province?.name ? i18n.t(spaceLng) : ""
          }${item?.name || ""}`
      )
      .filter(Boolean)
      .join(i18n.t(commaLng));
    if (!maxShow || maxShow >= initAddress?.length) return addressShow;
    return `${addressShow}...`;
  }
  return "";
};

export const formatSubCategoryShow = (subCategories = [], level = 2) => {
  const newCategories =
    subCategories?.filter(
      (itemSubCategory: any) => itemSubCategory?.order === level
    ) || [];
  if (newCategories?.length) {
    const subCategoryShow = newCategories
      .map((item: any) => item?.title)
      .join(i18n.t("common.comma"));
    return subCategoryShow;
  }
  return "";
};

export const convertJaMoney = (money?: number) => {
  if (money === 0) {
    return "￥0";
  }
  if (!money) return "";
  if (money >= 10000) {
    return "￥" + money / 10000 + "万";
  }
  if (money >= 100000000) {
    return "￥" + money / 100000000 + "億";
  }
  return "￥" + money / 1000 + "千";
};

export const convertArrayToJsonCSV = (initData: any[]) => {
  if (!initData.length) return "";
  const opts = {};
  const parser = new Parser(opts);
  const csvData = parser.parse(initData);

  return csvData;
};

export const checkSizeImage = (value: any, volume?: any) => {
  return value?.size < (volume || 5) * LIMIT_SIZE_IMAGE;
};

export const convertQueryDataObj = (queryString?: string) => {
  let queryObj = {};
  if (queryString) {
    queryObj = JSON.parse(
      '{"' + queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        const newValue = key === "keyword" ? value?.replace("+", " ") : value;
        if (key === "") {
          return newValue;
        } else if (newValue && newValue !== "null") {
          return decodeURIComponent(newValue);
        } else {
          return null;
        }
      }
    );
    return queryObj;
  }
  return undefined;
};

export const createQueryString = (initQuery?: Record<string, any>) => {
  if (isEmpty(initQuery)) return "";
  const params = new URLSearchParams();
  Object.entries(initQuery).forEach(
    ([key, value]: [key: string, value: any]) => {
      if (value !== undefined) {
        params.set(key, `${value}`);
      }
    }
  );
  return params.toString();
};

export const convertFilterDefault = (filter?: IFilter) => {
  if (filter) {
    let formDefaultValue = {};
    if (filter?.size) {
      formDefaultValue = {
        ...formDefaultValue,
        size: Number(filter?.size),
      };
    }
    if (filter?.page) {
      formDefaultValue = {
        ...formDefaultValue,
        page: Number(filter?.page),
      };
    }
    if (filter?.type) {
      formDefaultValue = {
        ...formDefaultValue,
        type: Number(filter?.type),
      };
    }
    if (filter?.verify_status) {
      formDefaultValue = {
        ...formDefaultValue,
        verify_status: Number(filter?.verify_status),
      };
    }
    if (filter?.status) {
      formDefaultValue = {
        ...formDefaultValue,
        status: Number(filter?.status),
      };
    }
    return formDefaultValue;
  }
  return null;
};

export const downloadFileXmlRequest = ({
  url,
  nameFile,
  filter,
}: {
  url: string;
  nameFile?: string;
  filter?: any;
}) => {
  const paramQuerry = filter ? `?${createQueryString(filter)}` : "";
  const tokenCurrent = storage.getToken();
  if (url) {
    const req = new XMLHttpRequest();
    req.open("GET", `${configs.API_DOMAIN}${url}${paramQuerry}`, true);
    req.setRequestHeader("Authorization", `Bearer ${tokenCurrent}`);
    req.responseType = "blob";
    req.onload = function () {
      const blob = new Blob([req.response], {
        type: "application/octetstream",
      });
      const isIE = false || !!document.DOCUMENT_NODE;
      const url = window.URL || window.webkitURL;
      const link = url.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("download", nameFile || "");
      a.setAttribute("href", link);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    req.onerror = function () {};
    req.send();
  }
};

export const htmlToText = (htmlString: any) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString || "", "text/html");
  const textContent = doc.body.textContent || "";
  return textContent.trim();
};

export const handleRegexUrl = (url: string) => {
  if (!url) return false;
  return !!url.match(REGEX_URL);
};
