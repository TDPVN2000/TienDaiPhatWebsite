import { Form, Input, DatePicker } from "antd";
import { ColumnsType } from "antd/es/table";
import CustomTable from "components/CustomTable";
import { IFilter, IViewInfo } from "constants/interfaces";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePermissions, useRole } from "utils/hooks/usePermissions";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from "../styles.module.scss";
import { Icon } from "@ant-design/compatible";
import { IconCalendar } from "assets/icon";
import dayjs from "dayjs";
import { commonValidate } from "constants/ruleForm";
import { formatCurrencyJapanese, formatYearMonthDay } from "utils/helper";

interface IProps {
  data: any[];
  isLoading?: boolean;
  onEdit?: (data: IViewInfo) => void;
  filter: IFilter;
  onRefetch(): void;
  dataForm: any;
  handleChangeNewPrice?(event: any, idItem?: any): any;
  setDisableBtnConfirm?: (data: any) => void;
}

function TableView({
  data,
  isLoading,
  onEdit,
  filter,
  onRefetch,
  dataForm,
  handleChangeNewPrice,
  setDisableBtnConfirm,
}: IProps) {
  const [t] = useTranslation();
  const permissions = usePermissions();
  const navigate = useNavigate();
  const role = useRole();

  const rangeDate = (date: dayjs.Dayjs) => {
    return date && date <= dayjs();
  };

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("view.categoryName"),
        dataIndex: "store_category",
        key: "store_category",
        render: (value: any, record: any, index: any) => (
          <div>{record?.store_category?.category_name}</div>
        ),
        width: "20%",
      },
      {
        title: t("view.currentPrice"),
        dataIndex: "current_price",
        key: "current_price",
        render: (value: any, record: any, index: any) => (
          <div>
            {record?.current_price
              ? formatCurrencyJapanese(record?.current_price)
              : ""}
          </div>
        ),
        width: "20%",
      },
      {
        title: t("view.lastUpdateDate"),
        dataIndex: "date_apply",
        key: "date_apply",
        render: (value: any, record: any, index: any) => (
          <div>{formatYearMonthDay(record?.date_apply)}</div>
        ),
        width: "20%",
      },
      {
        title: t("view.newPrice"),
        dataIndex: "new_price",
        key: "new_price",
        render: (value: any, record: any, index: any) => {
          const newDate = dataForm?.[index]?.new_date;
          return (
            <Form.Item
              name={[index, "new_price"]}
              rules={
                !!newDate
                  ? [commonValidate.required, commonValidate.price]
                  : [commonValidate.price]
              }
              validateFirst
              className={classNames(styles.viewFormItem, {
                [styles.hideError]: !newDate,
              })}
            >
              <Input
                className={classNames("input w-276 h-40", [styles.inputName])}
                placeholder={t("view.placeholders.newPrice")}
                allowClear
                onChange={(e: any) => handleChangeNewPrice?.(e, record?.id)}
                maxLength={10}
              />
            </Form.Item>
          );
        },
        width: "20%",
      },
      {
        title: t("view.dateApply"),
        dataIndex: "new_date",
        key: "new_date",
        render: (value: any, record: any, index: any) => {
          const newPrice =
            typeof dataForm?.[index]?.new_price === "number" ||
            dataForm?.[index]?.new_price?.length
              ? dataForm?.[index]?.new_price
              : null;
          return (
            <Form.Item
              name={[index, "new_date"]}
              rules={newPrice !== null ? [commonValidate.required] : []}
              className={classNames(styles.viewFormItem, {
                [styles.hideError]: newPrice === null,
              })}
            >
              <DatePicker
                className={classNames("datePickerCustom w-276 h-40", [
                  styles.datePicker,
                ])}
                suffixIcon={<Icon component={() => <IconCalendar />} />}
                placeholder={t("view.placeholders.dateApply")}
                inputReadOnly
                format={"YYYY/MM/DD"}
                disabledDate={rangeDate}
                onChange={(e: any) => setDisableBtnConfirm?.(false)}
              />
            </Form.Item>
          );
        },
        width: "20%",
      },
    ];
  }, [filter, role, dataForm]);

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={data}
        isLoading={isLoading}
        className={styles.table}
      />
    </>
  );
}

export default TableView;
