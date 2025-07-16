import dayjs from "dayjs";
import i18n from "i18n/i18n";
export const validateDeliveredDate = () => ({
  validator(_: any, value: any) {
    if (dayjs().add(5, "minute").isBefore(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(i18n.t("validate.deliveredDate", { time: 5 }))
    );
  },
});
