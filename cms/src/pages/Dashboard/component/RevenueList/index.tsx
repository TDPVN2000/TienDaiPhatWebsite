import HeaderContent from "components/HeaderContent";
import { useTranslation } from "react-i18next";
import { usePermissions } from "utils/hooks/usePermissions";
import styles from "./styles.module.scss";
import useFilter from "utils/hooks/useFilter";
import PaginationCustom from "components/PaginationCustom";
import { revenueStoreKey } from "utils/queryKey";
import { useQuery } from "@tanstack/react-query";
import { getRevenueStoreApi } from "api/revenue";
import Loading from "components/Loading";
import { DatePicker, Select } from "antd";
import {
  optionsDropdownRevenueStatus,
  urlExcelStatistic,
} from "utils/const/const";
import { downloadFileXmlRequest, formatCurrencyJapanese } from "utils/helper";
import { useNavigate } from "react-router-dom";
import TableRevenue from "./component/TableRevenue";
import InputSearch from "components/SearchHelper/InputSearch";
import { Icon } from "@ant-design/compatible";
import { IconCalendarModal } from "assets/icon";
import dayjs from "dayjs";

export default function RevenueList() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const { filter, handlePageChange, handleSearch } = useFilter({
    page: 1,
    size: 10,
    status: false,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: [revenueStoreKey, filter],
    queryFn: () => getRevenueStoreApi(filter),
  });

  const newOptionsDropdownRevenueStatus = [
    { value: null, label: t("common.all") },
    ...optionsDropdownRevenueStatus,
  ];

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <HeaderContent
        title=""
        buttonAdd={{
          title: t("revenues.list.csv"),
          onClick: () =>
            downloadFileXmlRequest({
              url: urlExcelStatistic.revenue,
              nameFile: `${
                filter?.date || dayjs(filter?.date).format("YYYY/MM")
              }_売上管理_出力.xlsx`,
              filter: {
                ...(typeof filter?.status === "boolean"
                  ? { status: filter?.status }
                  : {}),
                ...(filter?.keyword ? { keyword: filter?.keyword } : {}),
                date: `${
                  filter?.date || dayjs(filter?.date).format("MM/YYYY")
                }`,
              },
            }),
        }}
      />
      <div className={styles.body}>
        <div className={styles.viewFilter}>
          <div className={styles.viewTotalNotifications}>
            <span className={styles.titleTotalNotifications}>
              {t("revenues.list.total")}
            </span>
            <span className={styles.totalNotifications}>
              {formatCurrencyJapanese(data?.totalMoney || 0)}
            </span>
          </div>
          <div className={styles.viewFilter}>
            <InputSearch
              onSearchKeyword={handleSearch?.keywordSearch}
              placeholder={t("revenues.placeholders.inputFilter")}
            />
            <DatePicker
              className="datePickerCustom w-230 h-48 ml-8"
              suffixIcon={<Icon component={() => <IconCalendarModal />} />}
              inputReadOnly
              picker="month"
              format={"YYYY/MM"}
              defaultValue={dayjs()}
              onChange={(value: any) =>
                handleSearch.dateSearch(dayjs(value).format("MM/YYYY"))
              }
              allowClear={false}
              cellRender={(value: any) => {
                return (
                  <div className="ant-picker-cell-inner">{`${
                    dayjs(value).get("month") + 1
                  }月`}</div>
                );
              }}
            />
            <Select
              placeholder={t("revenues.placeholders.status")}
              options={newOptionsDropdownRevenueStatus}
              className="ml-8 w-244 select"
              onSelect={handleSearch?.statusSearch}
              value={filter?.status !== null ? filter?.status : null}
            />
          </div>
        </div>
        <div className="content-page">
          <TableRevenue
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
      </div>
    </div>
  );
}
