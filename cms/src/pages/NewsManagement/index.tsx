import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { getNewsApi } from "api/news";
import HeaderContent from "components/HeaderContent";
import Loading from "components/Loading";
import { QueryKey } from "constants/enums";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TableNews from "./components/TableNews";
import styles from "./styles.module.scss";

export default function NewsManagement() {
  const [t] = useTranslation();
  useState<boolean>(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const {
    data: tdpNewsData = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.LIST_NEWS],
    queryFn: () => getNewsApi(),
  });

  console.log(tdpNewsData);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const visibleTDPNews = tdpNewsData.slice(startIndex, endIndex);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <HeaderContent
        title={t("Danh sách tin tức")}
        buttonAdd={{
          title: t("Tạo tin tức"),
          onClick: () => navigate("/news-management/store"),
        }}
      />
      <div className={styles.body}> 
        <div className={styles.viewFilter}>
          <div className={styles.viewTotalNotifications}>
            <span className={styles.totalNotifications}>
              Bài viết: {tdpNewsData?.length}
            </span>
          </div>
          {/* <div className={styles.viewFilter}>
            <InputSearch
              onSearchKeyword={handleSearch?.titleSearch}
              placeholder={t("noti.placeholders.inputFilter")}
            />
            <Select
              placeholder={t("noti.type")}
              options={optionsCheckboxReceptionTarget}
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
          </div> */}
        </div>
        <div className="content-page">
          <TableNews
            data={visibleTDPNews || []}
            isLoading={false}
            onRefetch={refetch}
          />

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={tdpNewsData.length}
            onChange={handleChange}
            className={styles.pagination}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
