import { Checkbox, DatePicker, Form, Input, Switch, TimePicker } from "antd";
import Modal from "antd/es/modal/Modal";
import classNames from "classnames";
import { ActionModal, ButtonType } from "constants/enums";
import { INotification } from "constants/interfaces";
import { commonValidate } from "constants/ruleForm";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import CustomButton from "components/CustomButton";
import LabelInput from "components/LabelInput";
import { Icon } from "@ant-design/compatible";
import { IconArrowDropDown, IconClock, IconNoti } from "assets/icon";
import { optionFormatMonth, optionsCheckboxTypeHuman } from "utils/const/const";
import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useDebouncedCallback } from "use-debounce";
import i18n from "i18n/i18n";
import locale from "antd/es/date-picker/locale/de_DE";

interface IProps {
  open: boolean;
  toggle: () => void;
  type?: ActionModal;
  onSubmit: (param?: any) => any;
  isLoading?: boolean;
  dataNoti?: INotification;
  isSuccessEdit?: boolean;
}

const timePickerConfig = {
  className: "timePickerCustom",
  popupClassName: "timePickerPopup",
  suffixIcon: <Icon component={() => <IconClock />} />,
  placeholder: i18n.t("送信時間"),
  format: "HH:mm",
  inputReadOnly: true,
  showNow: false,
  locale: {
    ...locale,
    lang: {
      ...locale.lang,
      now: "現在",
      ok: "OK",
    },
  },
};

function ModalNotification({
  open,
  toggle,
  type,
  onSubmit,
  isLoading,
  dataNoti,
  isSuccessEdit,
}: IProps) {
  const [t] = useTranslation();
  const [form] = Form.useForm();
  const [typeChoosing, setTypeChoosing] = useState<Array<any>>([]);
  const isDraftRef = useRef<boolean>();
  dayjs.extend(utc);
  const optionTypeNumberArr = optionsCheckboxTypeHuman?.map(
    (item: any, index: any) => {
      return index;
    }
  );
  const [formatMonth, setFormatMonth] = useState<string>(
    optionFormatMonth.noneValue
  );

  const [unCheckSelectMonthPicker, setUnCheckSelectMonthPicker] =
    useState<boolean>(false);

  const [openSettingTime, setOpenSettingTime] = useState<boolean>(false);

  const yearCurrent = Form.useWatch("year", form);
  const timeCurrent = Form.useWatch("timePicker", form);
  const dayCurrent = Form.useWatch("day", form);

  const rangeYear = (date?: any) => {
    return date && date < dayjs();
  };

  const rangeMonth = (date?: any) => {
    return (
      !form.getFieldValue("year") ||
      (date && dayjs(date)?.isBefore(dayjs(), "month"))
    );
  };

  const year = useMemo(
    () => dayjs(form.getFieldValue("year")).get("year"),
    [form.getFieldValue("year")]
  );

  const month = useMemo(
    () => dayjs(form.getFieldValue("month")).get("month"),
    [form.getFieldValue("month")]
  );

  const isBetween = useMemo(
    () => (date: any) => {
      return (
        (dayjs(date).isSame(dayjs(`${year}-${month + 1}-1`).startOf("month")) ||
          dayjs(date).isAfter(
            dayjs(`${year}-${month + 1}-1`).startOf("month")
          )) &&
        (dayjs(date).isSame(dayjs(`${year}-${month + 1}-1`).endOf("month")) ||
          dayjs(date).isBefore(dayjs(`${year}-${month + 1}-1`).endOf("month")))
      );
    },
    [year, month]
  );

  const rangeDate = (date?: any) => {
    return (
      !form.getFieldValue("month") ||
      formatMonth === "月" ||
      (date && (date < dayjs().subtract(1, "day") || !isBetween(date)))
    );
  };

  const onOpenMonthPicker = () => {
    const isValidMonth = form.getFieldError("month")?.[0]?.length;
    if (formatMonth === optionFormatMonth.noneValue) {
      form.setFieldsValue({ month: yearCurrent });
      if (isValidMonth) {
        form.validateFields(["month"]);
      }
    }
  };

  const onChangeMonth = (value: any) => {
    if (value) {
      form.setFieldsValue({
        day: onPickDateForm(value),
      });

      setFormatMonth(optionFormatMonth.hasValue);
      debounced();
    } else {
      form.setFieldsValue({
        day: null,
      });
    }
    form.setFieldsValue({
      timePicker: undefined,
    });
  };

  const onSelectDate = (value: any) => {
    form.setFieldsValue({
      day: value,
      timePicker: undefined,
    });
  };

  const onSelectMonth = (value: any) => {
    if (formatMonth === optionFormatMonth.noneValue) {
      form.setFieldsValue({
        month: value,
        day: onPickDateForm(value),
      });
      setFormatMonth(optionFormatMonth.hasValue);
      debounced();
    }
  };

  const onPickDateForm = (date: any) => {
    if (
      dayjs().get("month") === dayjs(date)?.get("month") &&
      year === dayjs().get("year")
    ) {
      return dayjs();
    } else {
      return dayjs(date).set("date", 1);
    }
  };

  const onChangeYear = (value: any) => {
    const isValidMonth = form.getFieldError("month")?.[0]?.length;
    const isValidDate = form.getFieldError("day")?.[0]?.length;
    form.setFieldsValue({
      month: value,
      day: null,
      timePicker: undefined,
    });
    setFormatMonth(optionFormatMonth.noneValue);
    setUnCheckSelectMonthPicker(true);
    if (isValidMonth) {
      form.validateFields(["month"]);
    }
    if (isValidDate) {
      form.validateFields(["day"]);
    }
  };

  const debounced = useDebouncedCallback((value?: any) => {
    setUnCheckSelectMonthPicker(false);
  }, 500);

  const onCheckRangeTime = (dateCurrent: any, timeCurrent: any) => {
    const arrMinuteSample = Array.from({ length: 60 }, (_, index) => index + 0);
    const arrHourSample = Array.from({ length: 24 }, (_, index) => index + 0);

    let rangeHourValid: any[] = [];
    let rangeMinuteValid: any[] = [];

    const hourNow = dayjs().get("hour");
    const minuteNow = dayjs().get("minute");

    if (dayjs(dateCurrent).isSame(dayjs(), "day")) {
      rangeHourValid = arrHourSample?.filter(
        (hour: any) => hour >= hourNow && hour <= 23
      );
      if (dayjs(timeCurrent).isSame(dayjs(), "hour")) {
        rangeMinuteValid = arrMinuteSample?.filter(
          (minute: any) => minute >= minuteNow && minute <= 59
        );
      } else {
        rangeMinuteValid = arrMinuteSample;
      }
    } else {
      rangeHourValid = arrHourSample;
      rangeMinuteValid = arrMinuteSample;
    }

    // rangeTimeValid
    const rangeMinuteDisabled = arrMinuteSample?.filter(
      (minute: any) =>
        !rangeMinuteValid?.filter(
          (minuteValid: any) => minute?.toString() === minuteValid?.toString()
        )?.length
    );
    const rangeHourDisabled = arrHourSample?.filter(
      (hour: any) =>
        !rangeHourValid?.filter(
          (hourValid: any) => hour?.toString() === hourValid?.toString()
        )?.length
    );

    return {
      rangeMinuteDisabled,
      rangeHourDisabled,
      rangeMinuteValid,
      rangeHourValid,
    };
  };

  const onSelectTimeReply = (value: any) => {
    const { rangeMinuteValid } = onCheckRangeTime(dayCurrent, value);
    let timePickerValid: any;
    if (dayjs(value).get("minute") >= rangeMinuteValid[0]) {
      timePickerValid = value;
    } else {
      timePickerValid = dayjs(value).set("minute", rangeMinuteValid[0]);
    }
    form.setFieldsValue({
      timePicker: timePickerValid,
    });
  };

  const onResetForm = () => {
    form.resetFields();
  };
  const onCancelModal = () => {
    toggle?.();
    onResetForm();
    setTypeChoosing([]);
  };
  const onSetDataType = (data: any) => {
    form.setFieldsValue({
      type: data,
    });
    setTypeChoosing(data);
  };
  const checkTypeModal = (typeChecking: ActionModal) => {
    return type === typeChecking;
  };
  const onSelectTypeHumanOption = (data: any) => {
    const isTypeChoosingAllBefore = typeChoosing?.filter(
      (item?: any) => item === 0
    )?.length;
    const isTypeChoosingAllCurent = data?.filter(
      (item?: any) => item === 0
    )?.length;
    if (isTypeChoosingAllCurent) {
      if (!isTypeChoosingAllBefore) {
        onSetDataType(optionTypeNumberArr);
      } else {
        const newData = data?.filter((item?: any) => item !== 0);
        onSetDataType(newData);
      }
    } else if (!isTypeChoosingAllCurent) {
      if (isTypeChoosingAllBefore) {
        onSetDataType([]);
      } else if (data?.length === optionsCheckboxTypeHuman?.length - 1) {
        onSetDataType(optionTypeNumberArr);
      }
    } else {
      onSetDataType(data);
    }
  };

  useEffect(() => {
    if (dataNoti && checkTypeModal(ActionModal.EDIT)) {
      const newType = dataNoti?.type?.filter((item?: any) => item === 0)?.length
        ? optionTypeNumberArr
        : dataNoti?.type;
      form.setFieldsValue({
        ...dataNoti,
        year:
          dataNoti?.published_at && !dataNoti?.is_now
            ? dayjs(dataNoti.published_at)
            : dayjs(),
        month:
          dataNoti?.published_at && !dataNoti?.is_now
            ? dayjs(dataNoti.published_at)
            : dayjs(),
        day:
          dataNoti?.published_at && !dataNoti?.is_now
            ? dayjs(dataNoti.published_at)
            : dayjs(),
        timePicker:
          dataNoti?.published_at && !dataNoti?.is_now
            ? dayjs(dataNoti.published_at)
            : undefined,
        is_now: !dataNoti?.is_now,
        type: newType,
      });
      setTypeChoosing(newType);
      setOpenSettingTime(!dataNoti?.is_now);
      setFormatMonth(optionFormatMonth.hasValue);
    }
  }, [dataNoti, type, open]);

  useEffect(() => {
    if (isSuccessEdit) {
      onResetForm();
    }
  }, [isSuccessEdit]);

  const onFinish = (data: any) => {
    const dateReply = dayjs(data?.timePicker)
      .set("year", dayjs(data?.day)?.get("year"))
      .set("month", dayjs(data?.day)?.get("month"))
      .set("day", dayjs(data?.day)?.get("day"))
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss.00Z");

    const newType = data?.type?.filter((item: any) => item === 0)?.length
      ? [0]
      : data?.type;
    const { day, year, month, timePicker, ...newData } = data;
    onSubmit({
      ...newData,
      is_draft: isDraftRef.current,
      type: newType,
      is_now: !data.is_now,
      published_at: !data.is_now ? null : dateReply,
    });
  };

  const handleShowTimer = (value: any) => {
    setFormatMonth(
      value && !!form.getFieldValue("year")
        ? optionFormatMonth.hasValue
        : optionFormatMonth.noneValue
    );
    setOpenSettingTime(value);
  };

  return (
    <Modal
      title={
        <>
          <div>{t("modal.addNotiModalTitle")}</div>
        </>
      }
      open={open}
      onCancel={onCancelModal}
      footer={null}
      className="modalCustom"
      closable={false}
      width={638}
      destroyOnClose
      maskClosable={false}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className={styles.body}>
          <LabelInput title={t("modalAddNoti.title")} isRequired />
          <Form.Item name="title" rules={[commonValidate.required]}>
            <Input
              className={classNames("input w-556", [styles.inputName])}
              prefix={<Icon component={() => <IconNoti />} />}
              placeholder={t("modalAddNoti.placeholderTitle")}
              maxLength={100}
            />
          </Form.Item>
          <LabelInput title={t("modalAddNoti.content")} isRequired />
          <Form.Item
            name="content"
            rules={[commonValidate.required]}
            validateFirst
          >
            <Input.TextArea
              maxLength={1000}
              className="textAreaCustom"
              placeholder={t("modalAddNoti.placeholderContent")}
            />
          </Form.Item>
          <LabelInput title={t("modalAddNoti.type")} isRequired />
          <Form.Item name="type" rules={[commonValidate.required]}>
            <Checkbox.Group
              options={optionsCheckboxTypeHuman}
              className="checkboxGroup"
              onChange={onSelectTypeHumanOption}
            />
          </Form.Item>
          <div className={styles.itemBetween}>
            <LabelInput title={t("modalAddNoti.timer")} />
            <Form.Item name="is_now">
              <Switch
                value={openSettingTime}
                onChange={handleShowTimer}
                className="switchCustom w-48"
              />
            </Form.Item>
          </div>
          {openSettingTime && (
            <div className={styles.oneLine}>
              <Form.Item
                name="year"
                rules={[commonValidate.required]}
                style={{ width: "24%" }}
              >
                <DatePicker
                  className="datePickerCustom"
                  suffixIcon={<Icon component={() => <IconArrowDropDown />} />}
                  placeholder={t("placeholders.year")}
                  inputReadOnly
                  picker="year"
                  format={"YYYY 年"}
                  onChange={onChangeYear}
                  disabledDate={rangeYear}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[commonValidate.required]}
                style={{ width: "24%" }}
              >
                <DatePicker
                  className={classNames("datePickerCustom", [
                    {
                      [styles.placeholderDatePicker]:
                        formatMonth === optionFormatMonth.noneValue,
                    },
                  ])}
                  suffixIcon={<Icon component={() => <IconArrowDropDown />} />}
                  placeholder={t("placeholders.month")}
                  inputReadOnly
                  picker="month"
                  format={formatMonth}
                  dropdownClassName={classNames("datePickerPopup", [
                    {
                      [styles.unSelectMonthPicker]: unCheckSelectMonthPicker,
                    },
                  ])}
                  disabledDate={rangeMonth}
                  onClick={onOpenMonthPicker}
                  onChange={onChangeMonth}
                  onSelect={onSelectMonth}
                  allowClear={formatMonth === optionFormatMonth.hasValue}
                  cellRender={(value: any) => {
                    return (
                      <div className="ant-picker-cell-inner">{`${
                        dayjs(value).get("month") + 1
                      }月`}</div>
                    );
                  }}
                  style={{ width: "100%" }}
                  defaultValue={dayjs()}
                />
              </Form.Item>
              <Form.Item
                name="day"
                rules={[commonValidate.required]}
                style={{ width: "24%" }}
              >
                <DatePicker
                  className={classNames("datePickerCustom")}
                  suffixIcon={<Icon component={() => <IconArrowDropDown />} />}
                  placeholder={t("placeholders.day")}
                  onSelect={onSelectDate}
                  inputReadOnly
                  format={"D 日"}
                  picker="date"
                  popupClassName={"datePickerPopup"}
                  disabledDate={rangeDate}
                  allowClear={false}
                  style={{ width: "100%" }}
                  showToday={false}
                />
              </Form.Item>
              <Form.Item
                name={"timePicker"}
                rules={[commonValidate.required]}
                validateFirst={true}
                style={{ width: "24%" }}
              >
                <TimePicker
                  {...timePickerConfig}
                  onSelect={onSelectTimeReply}
                  style={{ width: "100%" }}
                  disabledTime={(date: any) => {
                    const rangeTime = onCheckRangeTime(dayCurrent, timeCurrent);
                    return {
                      disabledHours: () => rangeTime?.rangeHourDisabled || [],
                      disabledMinutes: () =>
                        rangeTime?.rangeMinuteDisabled || [],
                    };
                  }}
                />
              </Form.Item>
            </div>
          )}
          <div className={styles.viewBtn}>
            <CustomButton
              title={t("common.btnCancel")}
              onClick={onCancelModal}
              className={classNames([styles.btnSubmit])}
              isLoading={isLoading}
              type={ButtonType.OUTLINE}
            />
            <CustomButton
              title={t("modalAddNoti.btnDraft")}
              onClick={() => {
                form.submit();
                isDraftRef.current = true;
              }}
              className={classNames([styles.btnSubmit])}
              isLoading={isLoading}
            />
            <CustomButton
              title={t("modalAddNoti.btnSend")}
              onClick={() => {
                form.submit();
                isDraftRef.current = false;
              }}
              className={classNames([styles.btnSubmit])}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalNotification;
