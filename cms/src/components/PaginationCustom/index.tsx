import { Pagination, Select } from "antd";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { optionChangePageSize } from "utils/const/const";

interface IProps {
  pageIndex: number;
  pageSize?: number;
  totalItems: number;
  onPageChange: (page?: number, pageSize?: number) => void;
  className?: string;
}

export default function PaginationCustom({
  pageIndex,
  pageSize,
  totalItems,
  onPageChange,
  className,
}: IProps) {
  const [t] = useTranslation();

  const showTotal = (total: number, range: [number, number]) => {
    return t("table.showTotal", {
      rangeStart: range[0],
      rangeEnd: range[1],
      total: total,
    });
  };

  return (
    <div className={classNames(className, [styles.container])}>
      <Pagination
        current={pageIndex}
        total={totalItems}
        className="paginationCustom"
        showTotal={showTotal}
        showSizeChanger={false}
        onChange={onPageChange}
        pageSize={pageSize}
      />
      <Select
        defaultValue={optionChangePageSize[0]?.value}
        options={optionChangePageSize}
        className="ml-12 w-153 select"
        onSelect={(pageSize: number) => onPageChange(1, pageSize)}
        value={pageSize}
      />
    </div>
  );
}
