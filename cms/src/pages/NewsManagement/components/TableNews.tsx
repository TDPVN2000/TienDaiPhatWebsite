import { useMutation } from "@tanstack/react-query";
import { Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { deleteNewsApi } from "api/news";
import { deleteNotifyApi } from "api/notify";
import { Delete, Edit } from "components/ActionTable/ActionTable";
import CustomNotification from "components/CustomNotification";
import CustomTable from "components/CustomTable";
import ModalDeleteItem from "components/ModalDeleteItem";
import { IFilter, INotification } from "constants/interfaces";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  formatDate,
  formatYearMonthDay,
  handleErrorMessage,
  htmlToText,
} from "utils/helper";
import { useRole } from "utils/hooks/usePermissions";

interface IProps {
  data: any[];
  isLoading?: boolean;
  onRefetch(): void;
}

function TableNews({ data, isLoading, onRefetch }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const role = useRole();
  const [openModalDeleteNew, setOpenModalDeleteNew] = useState<boolean>(false);
  const [dataDeleteNew, setDataDeleteNew] = useState<INotification | undefined>(
    undefined
  );

  const { mutate: deleteNews, isLoading: loadingDeleteNew } = useMutation(
    deleteNewsApi,
    {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("Đã xóa thành công"),
        });
        setOpenModalDeleteNew(false);
        onRefetch();
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    }
  );

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("homePageNewsManagement.titleNews"),
        dataIndex: "title",
        key: "title",
        width: 240,
      },
      {
        title: t("Thumbnail"),
        dataIndex: "image_url",
        key: "image_url",
        width: 200,
        render: (value: any, record: any, index: any) => {
          return (
            <img
              src={record?.image_url}
              alt="thumbnail"
              style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          );
        },
      },
      {
        title: t("Description"),
        dataIndex: "description",
        key: "description",
        width: 320,
        render: (value: any, record: any, index: any) => (
          <div className="line-2">{record?.description}</div>
        ),
      },
      {
        title: t("homePageNewsManagement.postingTime"),
        dataIndex: "created_at",
        key: "created_at",
        render: (value: any, record: any, index: any) => (
          <div>{formatYearMonthDay(record?.created_at, formatDate)}</div>
        ),
        width: 160,
      },
      {
        title: "Action",
        key: "action",
        width: 75,
        align: "center" as any,
        onCell: (record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
            },
          };
        },
        render: (record: INotification) => (
          <Delete
            onDelete={() => {
              setOpenModalDeleteNew(true);
              setDataDeleteNew(record);
            }}
          />
        ),
      },
    ];
  }, [role]);

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={data}
        isLoading={isLoading}
        onRow={(data: any) => {
          navigate(`/news-management/detail/${data.id}`);
        }}
      />
      <ModalDeleteItem
        open={openModalDeleteNew}
        dataItem={dataDeleteNew}
        toggle={() => {
          setOpenModalDeleteNew(!openModalDeleteNew);
        }}
        onSubmit={deleteNews}
        title={t("Xác nhận xóa bài viết?")}
        isLoading={loadingDeleteNew}
        width={409}
        fullWidthBtn
      />
    </>
  );
}

export default TableNews;
