import { Empty, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface IProps {
  dataSource: any[];
  isLoading?: boolean;
  columns: ColumnsType<any>;
  onRow?: (data: any) => any;
  totalItems?: number;
  pageIndex?: number;
  scroll?: { x?: number; y?: number };
  onPageChange?: (page: number, take: number) => void | undefined;
  hidePagination?: boolean;
  className?: any;
}

export default function CustomTable({
  dataSource,
  columns,
  onRow,
  totalItems,
  isLoading,
  onPageChange,
  scroll,
  pageIndex,
  hidePagination,
  className,
}: IProps) {
  const [t] = useTranslation();

  return (
    <Table
      dataSource={dataSource || []}
      loading={isLoading}
      columns={columns}
      className={classNames("table", [className])}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("common.noData")}
          />
        ),
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (!!onRow) {
              onRow(record);
            }
          },
        };
      }}
      scroll={scroll ? scroll : { x: 1280 }}
      pagination={false}
    />
  );
}
