import i18next from 'i18next';

import { MIN_LENGTH_PASSWORD } from './default-value';
import { EMAIL, EMOJI, JAPANESE, PASSWORD, PHONE } from './regex';

export const RuleForm = {
  password: () => [
    () => ({
      validator(_: any, value: any) {
        const stringValue = value?.toString();
        const stringLength = stringValue?.length;
        if (stringLength === 0) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordRequired'))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordNoAllSpaces'))
          );
        }
        if (stringValue.match(EMOJI) || stringValue.match(JAPANESE)) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordWrongFormat'))
          );
        }
        if (stringLength < MIN_LENGTH_PASSWORD) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordTooShort'))
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
            new Error(i18next.t('validate.passwordRequired'))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordNoAllSpaces'))
          );
        }
        if (stringValue.match(EMOJI) || stringValue.match(JAPANESE)) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordWrongFormat'))
          );
        }
        if (stringLength < MIN_LENGTH_PASSWORD) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordTooShort'))
          );
        }
        return Promise.resolve();
      },
    }),
  ],
  confirmPassword: () => [
    ({ getFieldValue }: any) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue('new_password') === value) {
          return Promise.resolve();
        }
        const stringValue = value?.toString();
        const stringLength = stringValue?.length;
        if (stringLength === 0) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordRequired'))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordNoAllSpaces'))
          );
        }
        if (stringValue.match(EMOJI) || stringValue.match(JAPANESE)) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordWrongFormat'))
          );
        }
        if (stringLength < MIN_LENGTH_PASSWORD) {
          return Promise.reject(
            new Error(i18next.t('validate.passwordTooShort'))
          );
        }
        return Promise.reject(
          new Error(i18next.t('validate.passwordNotMatch'))
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
            new Error(i18next.t('validate.usernameRequired'))
          );
        }
        if (!stringValue?.trim()) {
          return Promise.reject(
            new Error(i18next.t('validate.usernameNoAllSpaces'))
          );
        }
        if (
          stringValue?.[0] === ' ' ||
          stringValue?.[stringLength - 1] === ' ' ||
          !stringValue?.match(EMAIL)
        ) {
          return Promise.reject(
            new Error(i18next.t('validate.usernameWrongFormat'))
          );
        }
        return Promise.resolve();
      },
    }),
  ],
};

export const commonValidate = {
  email: {
    pattern: EMAIL,
    message: i18next.t('validate.emailWrongFormat'),
  },
  phone: {
    pattern: PHONE,
    message: i18next.t('validate.phoneIsNotValid'),
  },
  required: {
    required: true,
    message: i18next.t('validate.fieldIsRequired'),
  },
  password: {
    pattern: PASSWORD,
    message: i18next.t('validate.passwordWrongFormat'),
  },
  whiteSpace: {
    whitespace: true,
    message: i18next.t('validate.noAllSpaces'),
  },
};
