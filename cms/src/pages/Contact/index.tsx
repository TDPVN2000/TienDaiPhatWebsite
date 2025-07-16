import HeaderContent from "components/HeaderContent";
import { useTranslation } from "react-i18next";
import { usePermissions } from "utils/hooks/usePermissions";
import styles from "./styles.module.scss";
import useFilter from "utils/hooks/useFilter";
import PaginationCustom from "components/PaginationCustom";
import { listContactKey } from "utils/queryKey";
import { useQuery } from "@tanstack/react-query";
import Loading from "components/Loading";
import { useNavigate } from "react-router-dom";
import TableContact from "./component/TableContact";
import { optionsDropdownContactStatus } from "utils/const/const";
import { Select } from "antd";
import { getContactApi } from "api/contact";

export default function ContactList() {
  const [t] = useTranslation();
  const permissions = usePermissions();
  const navigate = useNavigate();

  const { filter, handlePageChange, handleSearch } = useFilter({
    page: 1,
    size: 10,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: [listContactKey, filter],
    queryFn: () => getContactApi(filter),
  });

  const newOptionsDropdownContactStatus = [
    { value: null, label: t("common.all") },
    ...optionsDropdownContactStatus,
  ];
  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <HeaderContent title={t("contact.titlePage")} />
      <div className={styles.body}>
        <div className={styles.viewFilter}>
          <div className={styles.viewTotalContact}>
            <span className={styles.titleTotalContact}>
              {t("contact.totalContact")}
            </span>
            <span className={styles.totalContact}>{data?.totalRow}</span>
          </div>
          <div className={styles.viewFilter}>
            <Select
              placeholder={t("contact.modal")}
              options={newOptionsDropdownContactStatus}
              className="ml-8 w-244 select"
              onSelect={handleSearch?.statusSearch}
            />
          </div>
        </div>
        <div className="content-page">
          <TableContact
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
