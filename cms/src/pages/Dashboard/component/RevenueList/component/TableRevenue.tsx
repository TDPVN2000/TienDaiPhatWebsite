import { useMutation } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import CustomNotification from "components/CustomNotification";
import CustomTable from "components/CustomTable";
import { UserPermissionType } from "constants/enums";
import { IContact, IFilter } from "constants/interfaces";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  formatDateString,
  formatMonthRevenue,
  handleErrorMessage,
} from "utils/helper";
import { usePermissions, useRole } from "utils/hooks/usePermissions";
import useProfile from "utils/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { optionsDropdownRevenueStatus } from "utils/const/const";
import { Select } from "antd";
import classNames from "classnames";
import styles from "../styles.module.scss";
import { updateStatusStoreRevenueApi } from "api/revenue";

interface IProps {
  data: any[];
  isLoading?: boolean;
  onChangeStatus?: (data: any) => void;
  onEdit?: (data: IContact) => void;
  filter: IFilter;
  onRefetch(): void;
}

function TableRevenue({
  data,
  isLoading,
  onChangeStatus,
  onEdit,
  filter,
  onRefetch,
}: IProps) {
  const [t] = useTranslation();
  const permissions = usePermissions();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const role = useRole();

  const {
    mutate: changeStatusRevenueStore,
    isLoading: loadingChangeRevenueStore,
  } = useMutation(updateStatusStoreRevenueApi, {
    onSuccess: () => {
      CustomNotification({
        type: "success",
        message: t("notification.success"),
      });
      onRefetch();
    },
    onError: (err: any) => {
      handleErrorMessage(err);
    },
  });

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("revenues.list.nameStore"),
        dataIndex: "store_name",
        key: "store_name",
        width: "37%",
      },
      {
        title: t("revenues.list.month"),
        dataIndex: "statistic_date",
        key: "statistic_date",
        render: (value: any, record: any, index: any) => {
          const newDate = record?.statistic_date?.split("/");
          return (
            <div>
              {formatDateString(
                `${newDate[1]}/${newDate[0]}`,
                formatMonthRevenue
              )}
            </div>
          );
        },
        width: "17%",
      },
      {
        title: t("revenues.list.totalClient"),
        dataIndex: "total_view",
        key: "total_view",
        width: "17%",
      },
      {
        title: t("revenues.list.newStoreRevenue"),
        dataIndex: "total_revenue",
        key: "total_revenue",
        width: "17%",
      },
      {
        title: t("revenues.list.status"),
        dataIndex: "status_monthly_charge",
        key: "status_monthly_charge",
        onCell: (record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
            },
          };
        },
        render: (value: any, record: any, index: any) => {
          return (
            <>
              <Select
                placeholder={t("contact.modal")}
                options={optionsDropdownRevenueStatus}
                className={classNames("w-157 select h-40", [styles.select])}
                onSelect={(data: any) =>
                  changeStatusRevenueStore({
                    store_id: record?.store_id,
                    status: data,
                    date: record?.statistic_date,
                  })
                }
                value={record?.status_monthly_charge}
                loading={loadingChangeRevenueStore}
              />
            </>
          );
        },
        width: "12%",
      },
    ];
  }, [filter, role]);

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={data}
        isLoading={isLoading}
        onRow={(data: any) => {}}
      />
    </>
  );
}

export default TableRevenue;
