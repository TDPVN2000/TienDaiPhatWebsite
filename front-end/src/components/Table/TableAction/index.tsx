import { Button, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface IProps {
  onClick: () => void;
  className?: string;
}

export const Detail = ({ onClick, className }: IProps) => {
  const [t] = useTranslation();

  return (
    <Tooltip placement="top" title={t('tableAction.detail')}>
      <Button
        icon={<EyeOutlined rev={undefined} />}
        onClick={(e) => {
          e?.stopPropagation();
          onClick();
        }}
        className={className}
      ></Button>
    </Tooltip>
  );
};

export const Edit = ({ onClick, className }: IProps) => {
  const [t] = useTranslation();

  return (
    <Tooltip placement="top" title={t('tableAction.edit')}>
      <Button
        icon={<EditOutlined rev={undefined} />}
        onClick={(e) => {
          e?.stopPropagation();
          onClick();
        }}
        className={className}
      ></Button>
    </Tooltip>
  );
};

export const Delete = ({ onClick, className }: IProps) => {
  const [t] = useTranslation();

  return (
    <Popconfirm
      placement="top"
      title={t('popconfirm.deleteTitle')}
      okText={t('popconfirm.ok')}
      cancelText={t('popconfirm.cancel')}
      onCancel={(e) => {
        e?.stopPropagation();
      }}
      onConfirm={(e) => {
        e?.stopPropagation();
        onClick();
      }}
    >
      <Tooltip placement="top" title={t('tableAction.delete')}>
        <Button
          icon={<DeleteOutlined rev={undefined} />}
          className={className}
          onClick={(e) => {
            e.stopPropagation();
          }}
          danger
        ></Button>
      </Tooltip>
    </Popconfirm>
  );
};
