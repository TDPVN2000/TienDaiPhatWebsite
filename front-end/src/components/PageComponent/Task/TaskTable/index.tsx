import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/lib/table';
import { Table } from 'antd';

import { IFilter, ITaskRow } from 'constants/interface';
import { convertTimeToLocal, getIndexTable } from 'utils/helper';
import { Delete, Detail, Edit } from 'components/Table/TableAction';

interface IProps {
  filter: IFilter;
  data: ITaskRow[];
  loading: boolean;
}

export default function TaskTable({ filter, data, loading }: IProps) {
  const [t] = useTranslation();

  const columns: ColumnsType<ITaskRow> = [
    {
      title: t('table.index'),
      dataIndex: 'index',
      render: (value, record, index) => (
        <span>{getIndexTable(filter.pageIndex, filter.pageSize, index)}</span>
      ),
      width: '5%',
    },
    {
      title: t('table.taskName'),
      dataIndex: 'name',
      render: (value, record, index) => <span>{record?.name}</span>,
    },
    {
      title: t('table.amount'),
      dataIndex: 'amount',
      render: (value, record, index) => <span>{record?.amount}</span>,
    },
    {
      title: t('table.createdAt'),
      dataIndex: 'createdAt',
      render: (value, record, index) => (
        <span>{convertTimeToLocal(record?.createdAt)}</span>
      ),
      width: '10%',
    },
    {
      title: t('table.action'),
      render: (value, record, index) => {
        return (
          <div className="d-flex c-gap-10">
            <Detail onClick={() => {}} />
            <Edit onClick={() => {}} />
            <Delete onClick={() => {}} />
          </div>
        );
      },
      width: '15%',
      className: 'mw-150',
    },
  ];

  return (
    <>
      <Table
        rowKey={(obj) => obj.id}
        dataSource={data}
        columns={columns}
        pagination={false}
        loading={loading}
        bordered
        className="table-custom"
      />
    </>
  );
}
