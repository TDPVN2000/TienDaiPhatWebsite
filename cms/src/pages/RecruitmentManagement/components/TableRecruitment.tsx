import { useMutation } from "@tanstack/react-query";
import { Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { deleteNotifyApi } from "api/notify";
import { deleteRecruitmentApi } from "api/recruitment";
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
} from "utils/helper";
import { useRole } from "utils/hooks/usePermissions";

interface IProps {
  data: any[];
  isLoading?: boolean;
  onRefetch(): void;
}

function TableRecruitment({ data, isLoading, onRefetch }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const role = useRole();
  const [openModalDeleteRecruitment, setOpenModalDeleteRecruitment] =
    useState<boolean>(false);
  const [dataDeleteRecruitment, setDataDeleteRecruitment] = useState<
    INotification | undefined
  >(undefined);

  const { mutate: deleteRecruitment, isLoading: loadingDeleteRecruitment } =
    useMutation(deleteRecruitmentApi, {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("Đã xóa thành công"),
        });
        setOpenModalDeleteRecruitment(false);
        onRefetch();
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("Vị trí"),
        dataIndex: "position",
        key: "position",
        width: 150,
      },
      {
        title: t("Mô tả"),
        dataIndex: "des_position",
        key: "des_position",
        width: 250,
      },
      {
        title: t("Địa chỉ làm việc"),
        dataIndex: "address",
        key: "address",
        width: 250,
      },
      {
        title: t("Thời gian tạo bài"),
        dataIndex: "created_at",
        key: "created_at",
        render: (value: any, record: any, index: any) => (
          <div>{formatYearMonthDay(record?.created_at, formatDate)}</div>
        ),
        width: 160,
      },
      {
        title: t("Trạng thái"),
        dataIndex: "status",
        key: "status",
        render: (value: any, record: any, index: any) => {
          const isActive = value === "active";
          const color = isActive ? "green" : "gray";
          const text = isActive ? t("Active") : t("Inactive");
          return <span style={{ color }}>{text}</span>;
        },
        width: 120,
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
              setOpenModalDeleteRecruitment(true);
              setDataDeleteRecruitment(record);
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
          navigate(`/recruitment-management/detail/${data.id}`);
        }}
      />
      <ModalDeleteItem
        open={openModalDeleteRecruitment}
        dataItem={dataDeleteRecruitment}
        toggle={() => {
          setOpenModalDeleteRecruitment(!openModalDeleteRecruitment);
        }}
        onSubmit={deleteRecruitment}
        title={t("Xác nhận xóa bài tuyển dụng?")}
        isLoading={loadingDeleteRecruitment}
        width={409}
        fullWidthBtn
      />
    </>
  );
}

export default TableRecruitment;
