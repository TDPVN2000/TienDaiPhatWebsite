import { useMutation } from "@tanstack/react-query";
import { Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { deleteCertificationApi } from "api/certification";
import { deleteNotifyApi } from "api/notify";
import { Delete, Edit } from "components/ActionTable/ActionTable";
import CustomNotification from "components/CustomNotification";
import CustomTable from "components/CustomTable";
import ModalDeleteItem from "components/ModalDeleteItem";
import { INotification } from "constants/interfaces";
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

function TableCertification({ data, isLoading, onRefetch }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const role = useRole();
  const [openModalDeleteCertification, setOpenModalDeleteCertification] =
    useState<boolean>(false);
  const [dataDeleteCertification, setDataDeleteCertification] = useState<
    INotification | undefined
  >(undefined);

  const { mutate: deleteCertification, isLoading: loadingDeleteCertification } =
    useMutation(deleteCertificationApi, {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("Đã xóa thành công"),
        });
        setOpenModalDeleteCertification(false);
        onRefetch();
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("Tên chứng chỉ"),
        dataIndex: "name",
        key: "name",
        width: 240,
      },
      {
        title: t("Ảnh chứng chỉ"),
        dataIndex: "image_url",
        key: "image_url",
        width: 200,
        render: (value: any, record: any, index: any) => (
          <img
            src={record?.image_url}
            alt="thumbnail"
            style={{
              width: 150,
              height: 200,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ),
      },
      {
        title: t("Mô tả"),
        dataIndex: "description",
        key: "description",
        width: 320,
      },
      {
        title: t("Thời gian tạo"),
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
        width: 100,
        align: "center" as any,
        onCell: (record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
            },
          };
        },
        render: (record: INotification) => (
          <Row justify="center">
            <>
              <Edit
                onClick={() =>
                  navigate(`/certification-management/store/${record?.id}`)
                }
              />
              <Delete
                onDelete={() => {
                  setOpenModalDeleteCertification(true);
                  setDataDeleteCertification(record);
                }}
              />
            </>
          </Row>
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
          navigate(`/certification-management/detail/${data.id}`);
        }}
      />
      <ModalDeleteItem
        open={openModalDeleteCertification}
        dataItem={dataDeleteCertification}
        toggle={() => {
          setOpenModalDeleteCertification(!openModalDeleteCertification);
        }}
        onSubmit={deleteCertification}
        title={t("Xác nhận xóa chứng chỉ?")}
        isLoading={loadingDeleteCertification}
        width={409}
        fullWidthBtn
      />
    </>
  );
}

export default TableCertification;
