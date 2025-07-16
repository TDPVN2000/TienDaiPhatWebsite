import { useMutation } from "@tanstack/react-query";
import { Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { deleteNotifyApi } from "api/notify";
import { deleteProjectsApi } from "api/projects";
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

function TableProjects({ data, isLoading, onRefetch }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const role = useRole();
  const [openModalDeleteProject, setOpenModalDeleteProject] =
    useState<boolean>(false);
  const [dataDeleteProject, setDataDeleteProject] = useState<
    INotification | undefined
  >(undefined);

  const { mutate: deleteProject, isLoading: loadingDeleteProject } =
    useMutation(deleteProjectsApi, {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("Đã xóa thành công"),
        });
        setOpenModalDeleteProject(false);
        onRefetch();
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("Tên dự án"),
        dataIndex: "name",
        key: "name",
        width: 240,
      },
      {
        title: t("Thumbnail"),
        dataIndex: "image_url",
        key: "image_url",
        width: 200,
        render: (value: any, record: any, index: any) => (
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
        ),
      },
      {
        title: t("Mô tả"),
        dataIndex: "description",
        key: "description",
        width: 320,
        render: (value: any, record: any, index: any) => (
          <div className="line-2">{record?.description}</div>
        ),
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
        title: t("Năm hoàn thành"),
        dataIndex: "year_completed",
        key: "year_completed",
        render: (value: any, record: any, index: any) => (
          <div>{formatYearMonthDay(record?.year_completed, formatDate)}</div>
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
          <Delete
            onDelete={() => {
              setOpenModalDeleteProject(true);
              setDataDeleteProject(record);
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
          navigate(`/projects-management/detail/${data.id}`);
        }}
      />
      <ModalDeleteItem
        open={openModalDeleteProject}
        dataItem={dataDeleteProject}
        toggle={() => {
          setOpenModalDeleteProject(!openModalDeleteProject);
        }}
        onSubmit={deleteProject}
        title={t("Xác nhận xóa dự án?")}
        isLoading={loadingDeleteProject}
        width={409}
        fullWidthBtn
      />
    </>
  );
}

export default TableProjects;
