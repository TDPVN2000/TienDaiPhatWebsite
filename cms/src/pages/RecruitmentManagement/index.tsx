import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { getRecruitmentApi } from "api/recruitment";
import HeaderContent from "components/HeaderContent";
import Loading from "components/Loading";
import { QueryKey } from "constants/enums";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TableRecruitment from "./components/TableRecruitment";
import styles from "./styles.module.scss";

export default function RecruitmentManagement() {
  const [t] = useTranslation();
  useState<boolean>(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const {
    data: tdpRecruitmentData = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.LIST_RECRUITMENT],
    queryFn: () => getRecruitmentApi(),
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const visibleRecruitment = tdpRecruitmentData.slice(startIndex, endIndex);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <HeaderContent
        title={t("Danh sách tuyển dụng")}
        buttonAdd={{
          title: t("Tạo bài tuyển dụng"),
          onClick: () => navigate("/recruitment-management/store"),
        }}
      />
      <div className={styles.body}>
        <div className={styles.viewFilter}>
          <div className={styles.viewTotalNotifications}>
            <span className={styles.totalNotifications}>
              Tin tuyển dụng: {tdpRecruitmentData?.length}
            </span>
          </div>
        </div>
        <div className="content-page">
          <TableRecruitment
            data={visibleRecruitment || []}
            isLoading={false}
            onRefetch={refetch}
          />

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={tdpRecruitmentData.length}
            onChange={handleChange}
            className={styles.pagination}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
