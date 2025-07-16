import HeaderContent from "components/HeaderContent";
import { useTranslation } from "react-i18next";
import { usePermissions } from "utils/hooks/usePermissions";
import styles from "./styles.module.scss";
import useFilter from "utils/hooks/useFilter";
import PaginationCustom from "components/PaginationCustom";
import { listNotificationKey } from "utils/queryKey";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createNotiApi, getNotiApi, getDetailNotiApi } from "api/notifications";
import Loading from "components/Loading";
import { Select } from "antd";
import {
  optionsDropdownStatusNoti,
  optionsDropdownTypeHuman,
} from "utils/const/const";
import { useState } from "react";
import { ActionModal } from "constants/enums";
import { formatYearMonthDay, handleErrorMessage } from "utils/helper";
import CustomNotification from "components/CustomNotification";
import { INotification } from "constants/interfaces";
import { useNavigate } from "react-router-dom";
import TableNotification from "./components/TableNotification";
import ModalEditNotification from "./components/ModalEditNoti/ModalEditNotification";
import InputSearch from "components/SearchHelper/InputSearch";
import dayjs from "dayjs";

export default function NotificationList() {
  const [t] = useTranslation();
  const permissions = usePermissions();
  const [openAddNotification, setOpenAddNotification] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const { filter, handlePageChange, handleSearch } = useFilter({
    page: 1,
    size: 10,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: [listNotificationKey, filter],
    queryFn: () => getNotiApi(filter),
  });

  const handleCreateNotification = async (data: INotification) => {
    const newData = data?.is_draft ? data : { ...data, published_at: dayjs() };
    return await createNotiApi({
      ...newData,
    });
  };

  const {
    mutate: createNotification,
    isLoading: loadingCreateNotification,
    isSuccess,
  } = useMutation(handleCreateNotification, {
    onSuccess: (data: any) => {
      CustomNotification({
        type: "success",
        message: t("notification.success"),
      });
      setOpenAddNotification(false);
      refetch();
    },
    onError: (err: any) => {
      handleErrorMessage(err);
    },
  });

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <HeaderContent
        title={t("noti.titlePage")}
        buttonAdd={{
          title: t("noti.btnAdd"),
          onClick: () => setOpenAddNotification(!openAddNotification),
        }}
      />
      <div className={styles.body}>
        <div className={styles.viewFilter}>
          <div className={styles.viewTotalNotifications}>
            <span className={styles.titleTotalNotifications}>
              {t("noti.totalNoti")}
            </span>
            <span className={styles.totalNotifications}>{data?.totalRow}</span>
          </div>
          <div className={styles.viewFilter}>
            <InputSearch
              onSearchKeyword={handleSearch?.keywordSearch}
              placeholder={t("noti.placeholders.inputFilter")}
            />
            <Select
              placeholder={t("noti.type")}
              options={optionsDropdownTypeHuman}
              className="ml-8 w-244 select"
              onSelect={handleSearch?.humanSearch}
              allowClear
              onClear={() => handleSearch?.humanSearch(null)}
            />
            <Select
              placeholder={t("noti.status")}
              options={optionsDropdownStatusNoti}
              className="ml-8 w-244 select"
              onSelect={handleSearch?.statusSearch}
            />
          </div>
        </div>
        <div className="content-page">
          <TableNotification
            data={data?.records || []}
            isLoading={false}
            filter={filter}
            onRefetch={refetch}
          />
          <PaginationCustom
            pageIndex={filter.page || 1}
            pageSize={filter.size || 10}
            onPageChange={handlePageChange}
            totalItems={data?.totalRow}
            className={styles.pagination}
          />
        </div>
        <ModalEditNotification
          open={openAddNotification}
          toggle={() => {
            setOpenAddNotification(!openAddNotification);
          }}
          type={ActionModal.CREATE}
          onSubmit={createNotification}
          isLoading={loadingCreateNotification}
          isSuccessEdit={isSuccess}
        />
      </div>
    </div>
  );
}
