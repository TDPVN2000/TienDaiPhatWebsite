import { Pagination, PaginationProps } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps {
  pageIndex: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

export default function PaginationCustom({
  pageIndex,
  pageSize,
  total,
  onChange,
}: IProps) {
  const [t] = useTranslation();

  const showTotal: PaginationProps['showTotal'] = (total, range) =>
    t('pagination.total', { start: range[0], end: range[1], total });

  return (
    <Pagination
      current={pageIndex}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={false}
      showTotal={showTotal}
    />
  );
}
