import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import CustomNotification from "components/CustomNotification";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  formatDateString,
  formatYearMonthDay,
  handleErrorMessage,
} from "utils/helper";
import styles from "./styles.module.scss";
import { ButtonType, QueryKey, SendContactType } from "constants/enums";
import { IContact } from "constants/interfaces";
import { InfoDetailItem } from "components/InfoDetailItem";
import HeaderContent from "components/HeaderContent";
import {
  getDetailContactApi,
  getDataReplyContactApi,
  replyContactApi,
} from "api/contact";
import useFilter from "utils/hooks/useFilter";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import LabelInput from "components/LabelInput";
import { DatePicker, Form, Input, Switch, TimePicker } from "antd";
import classNames from "classnames";
import { Icon } from "@ant-design/compatible";
import { commonValidate } from "constants/ruleForm";
import { IconArrowDropDown, IconClock } from "assets/icon";
import i18n from "i18n/i18n";
import locale from "antd/es/date-picker/locale/de_DE";
import { optionFormatMonth } from "utils/const/const";
import dayjs from "dayjs";
import { useDebouncedCallback } from "use-debounce";
import CustomButton from "components/CustomButton";
import utc from "dayjs/plugin/utc";
import { infoBadgeKey } from "utils/queryKey";

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

const DEFAULT_TAKE = 10;

export default function ContactDetail() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { ref, inView } = useInView();
  const [form] = Form.useForm();
  dayjs.extend(utc);
  const yearCurrent = Form.useWatch("year", form);
  const timeCurrent = Form.useWatch("timePicker", form);
  const dayCurrent = Form.useWatch("day", form);
  const queryClient = useQueryClient();

  const [openSettingTime, setOpenSettingTime] = useState<boolean>(false);
  const [formatMonth, setFormatMonth] = useState<string>(
    optionFormatMonth.noneValue
  );
  const [unCheckSelectMonthPicker, setUnCheckSelectMonthPicker] =
    useState<boolean>(false);

  const rangeYear = (date?: any) => {
    return date && date < dayjs();
  };

  const rangeMonth = (date?: any) => {
    return (
      !form.getFieldValue("year") ||
      (date && dayjs(date)?.isBefore(dayjs(), "month"))
    );
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

  const {
    data: dataContact,
    isLoading: loadingContact,
    refetch,
  } = useQuery([QueryKey.DETAIL_CONTACT], () => getDetailContactApi(id));

  const { filter } = useFilter({
    page: 1,
    size: 10,
  });

  const fetchPostsCateStore = async (params: any) => {
    const data = await getDataReplyContactApi(id, params);
    return {
      data: data.records,
      page: data.currentPage,
      total: data.totalRow,
    };
  };

  const {
    data: dataReplyContact,
    fetchNextPage: fetchNextPageReplyContact,
    refetch: refetchReplyContact,
    isFetching: isFetchingReplyContact,
  } = useInfiniteQuery(
    [QueryKey.DETAIL_CONTACT, filter],
    ({ pageParam = 1 }) => {
      return fetchPostsCateStore({ ...filter, page: pageParam });
    },
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        return lastPage?.page + 1;
      },
      enabled: !!id,
    }
  );

  const newDataReplyContact =
    (dataReplyContact?.pages || [])?.reduce(
      (a: any, b: any) => a.concat(b.data),
      []
    ) || [];

  const handleReplyContact = async (data: any) => {
    const dateReply = dayjs(data?.timePicker)
      .set("year", dayjs(data?.day)?.get("year"))
      .set("month", dayjs(data?.day)?.get("month"))
      .set("day", dayjs(data?.day)?.get("day"))
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss.00Z");

    const dataReply = {
      content: data?.content,
      is_now: !openSettingTime,
      ...(openSettingTime ? { published_at: dateReply } : {}),
    };
    await replyContactApi(id, dataReply);
  };

  const {
    mutate: replyContact,
    isLoading: loadingReplyContact,
    isSuccess,
  } = useMutation(handleReplyContact, {
    onSuccess: () => {
      CustomNotification({
        type: "success",
        message: t("notification.success"),
      });
      form.resetFields();
      refetchReplyContact();
      queryClient.invalidateQueries([infoBadgeKey]);
    },
    onError: (err: any) => {
      handleErrorMessage(err);
    },
  });

  useEffect(() => {
    if (
      inView &&
      dataReplyContact?.pages?.[0]?.total &&
      Number(dataReplyContact?.pageParams?.length) * DEFAULT_TAKE <
        Number(dataReplyContact?.pages?.[0]?.total)
    ) {
      fetchNextPageReplyContact();
    }
  }, [inView]);

  useEffect(() => {
    if (openSettingTime) {
      form.setFieldsValue({
        year: dayjs(),
        month: dayjs(),
        day: dayjs(),
      });
      setFormatMonth(optionFormatMonth.hasValue);
    }
  }, [openSettingTime]);

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

  return (
    <div className={styles.container}>
      {(loadingContact || loadingReplyContact) && <Loading />}
      <HeaderContent title={t("contact.detail.title")} hasBack />
      <div className={styles.body}>
        <div className={styles.infoContact}>
          <InfoDetailItem
            title={t("contact.email")}
            content={dataContact?.email}
          />
          <InfoDetailItem
            title={t("contact.sendAt")}
            content={formatDateString(dataContact?.created_at)}
          />
          <InfoDetailItem
            title={t("contact.title")}
            content={dataContact?.title}
          />
          <InfoDetailItem
            title={t("contact.content")}
            content={dataContact?.content}
          />
        </div>
        <div className={styles.replyList}>
          {newDataReplyContact?.map((item: any) => {
            return (
              <div className={styles.itemReply}>
                <InfoDetailItem
                  title={
                    item?.send_type === SendContactType.ADMIN
                      ? "管理者"
                      : item?.email
                  }
                  content={item?.content}
                  titleRight={`${
                    item?.is_public ? "" : "送信待ち - "
                  }${formatDateString(item?.published_at)}`}
                />
              </div>
            );
          })}
        </div>
        <div ref={ref} style={{ marginBottom: 20 }}></div>
      </div>
      <div className={styles.viewReply}>
        <Form
          onFinish={replyContact}
          form={form}
          name="replyContact"
          layout="vertical"
        >
          <LabelInput title={t("内容")} isRequired />
          <Form.Item
            name="content"
            validateFirst
            rules={[commonValidate.required]}
          >
            <Input.TextArea
              maxLength={1000}
              className="textAreaCustom h-87"
              placeholder={t("内容入力")}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <div className={styles.settingTime}>
            <div
              className={classNames([
                styles.viewTitle,
                { [styles.viewTitle__after]: openSettingTime },
              ])}
            >
              <div>{t("送信時間")}</div>
              <Switch
                checked={openSettingTime}
                onChange={(value: any) => setOpenSettingTime(value)}
                className="switchCustom w-48"
              />
            </div>
            {openSettingTime && (
              <div className={styles.bodySettingTime}>
                <div className={styles.viewPickTime}>
                  <Form.Item
                    name="year"
                    rules={[commonValidate.required]}
                    style={{ width: "24%" }}
                  >
                    <DatePicker
                      className="datePickerCustom"
                      suffixIcon={
                        <Icon component={() => <IconArrowDropDown />} />
                      }
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
                      suffixIcon={
                        <Icon component={() => <IconArrowDropDown />} />
                      }
                      placeholder={t("placeholders.month")}
                      inputReadOnly
                      picker="month"
                      format={formatMonth}
                      dropdownClassName={classNames("datePickerPopup", [
                        {
                          [styles.unSelectMonthPicker]:
                            unCheckSelectMonthPicker,
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
                    />
                  </Form.Item>
                  <Form.Item
                    name="day"
                    rules={[commonValidate.required]}
                    style={{ width: "24%" }}
                  >
                    <DatePicker
                      className={classNames("datePickerCustom")}
                      suffixIcon={
                        <Icon component={() => <IconArrowDropDown />} />
                      }
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
                        const rangeTime = onCheckRangeTime(
                          dayCurrent,
                          timeCurrent
                        );
                        return {
                          disabledHours: () =>
                            rangeTime?.rangeHourDisabled || [],
                          disabledMinutes: () =>
                            rangeTime?.rangeMinuteDisabled || [],
                        };
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            )}
            <div className={styles.viewBtnConfirm}>
              <CustomButton
                title={t("common.btnCancel")}
                onClick={() => navigate(-1)}
                className={classNames([styles.btnSubmit])}
                isLoading={loadingReplyContact}
                type={ButtonType.OUTLINE}
                style={{ width: "100%" }}
              />
              <CustomButton
                title={t("送信")}
                onClick={() => form.submit()}
                className={classNames([styles.btnSubmit])}
                isLoading={loadingReplyContact}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
