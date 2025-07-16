import i18next from "i18next";

import { MIN_LENGTH_PASSWORD } from "./defaultValues";
import {
  FULL_NAME_REGEX,
  REGEX_EMAIL,
  REGEX_EMOJI,
  REGEX_JAPANESE,
  REGEX_KATAKANA,
  REGEX_PASSWORD,
  REGEX_PHONE,
  REGEX_PRICE,
  REGEX_URL,
} from "./regex";

export const RuleForm = {
  address: () => [
    () => ({
      validator(_: any, value: any) {
        const stringValue = value?.toString();
        const stringLength = stringValue?.length;
        console.log("stringLength", stringLength);
        if (stringLength === 0) {
          return Promise.reject(
            new Error(i18next.t("validate.fieldIsRequired"))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t("validate.fieldIsRequired"))
          );
        }
        if (stringLength < 50) {
          return Promise.reject(
            new Error(i18next.t("50文字以下でご入力ください。"))
          );
        }
        return Promise.resolve();
      },
    }),
  ],
  password: () => [
    () => ({
      validator(_: any, value: any) {
        const stringValue = value?.toString();
        const stringLength = stringValue?.length;
        if (stringLength === 0) {
          return Promise.reject(
            new Error(i18next.t("validate.fieldIsRequired"))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t("validate.fieldIsRequired"))
          );
        }
        if (
          stringValue.match(REGEX_EMOJI) ||
          stringValue.match(REGEX_JAPANESE)
        ) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordTooShort"))
          );
        }
        if (stringLength < MIN_LENGTH_PASSWORD) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordTooShort"))
          );
        }
        return Promise.resolve();
      },
    }),
  ],
  newPassword: () => [
    () => ({
      validator(_: any, value: any) {
        const stringValue = value?.toString();
        const stringLength = stringValue?.length;
        if (stringLength === 0) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordRequired"))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordNoAllSpaces"))
          );
        }
        if (
          stringValue.match(REGEX_EMOJI) ||
          stringValue.match(REGEX_JAPANESE)
        ) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordWrongFormat"))
          );
        }
        if (stringLength < MIN_LENGTH_PASSWORD) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordTooShort"))
          );
        }
        return Promise.resolve();
      },
    }),
  ],
  confirmPassword: () => [
    ({ getFieldValue }: any) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue("new_password") === value) {
          return Promise.resolve();
        }
        const stringValue = value?.toString();
        const stringLength = stringValue?.length;
        if (stringLength === 0) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordRequired"))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordNoAllSpaces"))
          );
        }
        if (
          stringValue.match(REGEX_EMOJI) ||
          stringValue.match(REGEX_JAPANESE)
        ) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordWrongFormat"))
          );
        }
        if (stringLength < MIN_LENGTH_PASSWORD) {
          return Promise.reject(
            new Error(i18next.t("validate.passwordTooShort"))
          );
        }
        return Promise.reject(
          new Error(i18next.t("validate.passwordNotMatch"))
        );
      },
    }),
  ],
  username: () => [
    () => ({
      validator(_: any, value: any) {
        const stringValue = value?.toString();
        const stringLength = stringValue?.length;
        if (stringLength === 0) {
          return Promise.reject(
            new Error(i18next.t("validate.usernameRequired"))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t("validate.usernameNoAllSpaces"))
          );
        }
        if (
          stringValue?.[0] === " " ||
          stringValue?.[stringLength - 1] === " " ||
          !stringValue?.match(REGEX_EMAIL)
        ) {
          return Promise.reject(
            new Error(i18next.t("validate.usernameWrongFormat"))
          );
        }
        return Promise.resolve();
      },
    }),
  ],
};

export const commonValidate = {
  email: {
    pattern: REGEX_EMAIL,
    message: i18next.t("validate.emailWrongFormat"),
  },
  phone: {
    pattern: REGEX_PHONE,
    message: i18next.t("validate.phoneIsNotValid"),
  },
  required: {
    required: true,
    message: i18next.t("validate.fieldIsRequired"),
  },
  birthday: {
    pattern: REGEX_PRICE,
    message: i18next.t("validate.fieldIsRequired"),
  },
  price: {
    pattern: REGEX_PRICE,
    message: i18next.t("validate.notNumber"),
  },
  name: {
    pattern: FULL_NAME_REGEX,
    message: i18next.t("validate.nameForm"),
  },
  lastName: {
    pattern: REGEX_KATAKANA,
    message: i18next.t("validate.lastName"),
  },
  passRequired: (field: string) => {
    return {
      required: true,
      message: i18next.t("validate.passRequired", { field }),
    };
  },
  password: {
    pattern: REGEX_PASSWORD,
    message: i18next.t("validate.passwordTooShort"),
  },
  whiteSpace: {
    whitespace: true,
    message: i18next.t("validate.noAllSpaces"),
  },
  url: {
    pattern: REGEX_URL,
    message: i18next.t("validate.urlInvalid"),
  },
};
