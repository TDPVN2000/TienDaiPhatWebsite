import { useMutation } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { Delete } from "components/ActionTable/ActionTable";
import CustomNotification from "components/CustomNotification";
import CustomTable from "components/CustomTable";
import { ActionModal, UserPermissionType } from "constants/enums";
import { IFilter, INotification } from "constants/interfaces";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay, handleErrorMessage } from "utils/helper";
import { usePermissions, useRole } from "utils/hooks/usePermissions";
import useProfile from "utils/hooks/useProfile";
import ModalDeleteItem from "components/ModalDeleteItem";
import { useNavigate } from "react-router-dom";
import { deleteNotiApi, updateNotiApi } from "api/notifications";
import { optionsCheckboxTypeHuman } from "utils/const/const";
import ModalDetailNotification from "./ModalDetailNoti/ModalDetailNotification";
import ModalEditNotification from "./ModalEditNoti/ModalEditNotification";
import dayjs from "dayjs";

interface IProps {
  data: any[];
  isLoading?: boolean;
  onChangeStatus?: (data: any) => void;
  onEdit?: (data?: any) => any;
  filter: IFilter;
  onRefetch(): void;
}

function TableNotifications({
  data,
  isLoading,
  onChangeStatus,
  onEdit,
  filter,
  onRefetch,
}: IProps) {
  const [t] = useTranslation();
  const permissions = usePermissions();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const role = useRole();
  const [openModalDeleteNotification, setOpenModalDeleteNotification] =
    useState<boolean>(false);
  const [dataDeleteNotification, setDataDeleteNotification] = useState<
    INotification | undefined
  >(undefined);
  const [openModalDetailNotification, setOpenModalDetailNotification] =
    useState<boolean>(false);
  const [dataDetailNotification, setDataDetailNotification] = useState<
    INotification | undefined
  >(undefined);
  const [openEditNotification, setOpenEditNotification] =
    useState<boolean>(false);
  const [dataEditNotification, setDataEditNotification] = useState<
    INotification | undefined
  >(undefined);

  const { mutate: deleteNotification, isLoading: loadingDeleteNotification } =
    useMutation(deleteNotiApi, {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        setOpenModalDeleteNotification(false);
        onRefetch();
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const handleEditNoti = async (data: any) => {
    const newData = data?.is_draft ? data : { ...data, published_at: dayjs() };
    await updateNotiApi({
      notiId: dataEditNotification?.id,
      params: newData,
    });
  };

  const {
    mutate: editNoti,
    isLoading: loadingNoti,
    isSuccess,
  } = useMutation(handleEditNoti, {
    onSuccess: () => {
      CustomNotification({
        type: "success",
        message: t("notification.success"),
      });
      setOpenEditNotification(false);
      onRefetch();
    },
    onError: (err: any) => {
      handleErrorMessage(err);
    },
  });
  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("noti.title"),
        dataIndex: "title",
        key: "title",
        width: 240,
      },
      {
        title: t("noti.content"),
        dataIndex: "content",
        key: "content",
        width: 420,
      },
      {
        title: t("noti.type"),
        dataIndex: "type",
        key: "type",
        width: 110,
        render: (value: any, record: any, index: any) => {
          const newTypeArr = (record?.type?.length ? record?.type : [])?.map(
            (infoType: any) => {
              return optionsCheckboxTypeHuman?.find(
                (item: any) => item?.value === infoType
              )?.label;
            }
          );
          return (
            <>
              {newTypeArr?.map((item: any) => {
                return <div>{item}</div>;
              })}
            </>
          );
        },
      },
      {
        title: t("noti.publicAt"),
        dataIndex: "phone_number",
        key: "phone_number",
        render: (value: any, record: any, index: any) => (
          <div>{formatYearMonthDay(record?.published_at)}</div>
        ),
        width: 160,
      },
      {
        title: t("noti.status"),
        dataIndex: "is_draft",
        key: "is_draft",
        render: (value: any, record: any, index: any) => (
          <div>{record?.is_draft ? t("common.draft") : t("common.send")}</div>
        ),
        width: 126,
      },
      {
        title: " ",
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
              setOpenModalDeleteNotification(true);
              setDataDeleteNotification(record);
            }}
          />
        ),
      },
    ];
  }, [filter, role]);

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={data}
        isLoading={isLoading}
        onRow={(data: any) => {
          if (data?.is_draft) {
            setDataEditNotification(data);
            setOpenEditNotification(true);
          } else {
            setDataDetailNotification(data);
            setOpenModalDetailNotification(true);
          }
        }}
      />
      <ModalDeleteItem
        open={openModalDeleteNotification}
        dataItem={dataDeleteNotification}
        toggle={() => {
          setOpenModalDeleteNotification(!openModalDeleteNotification);
        }}
        onSubmit={deleteNotification}
        title={t("modal.titleModalDeleteItem")}
        isLoading={loadingDeleteNotification}
      />
      <ModalDetailNotification
        open={openModalDetailNotification}
        dataItem={dataDetailNotification}
        toggle={() => {
          setOpenModalDetailNotification(!openModalDetailNotification);
        }}
        onSubmit={() => {
          setDataDeleteNotification(dataDetailNotification);
          setOpenModalDeleteNotification(true);
          setOpenModalDetailNotification(false);
        }}
      />
      <ModalEditNotification
        open={openEditNotification}
        toggle={() => {
          setOpenEditNotification(!openEditNotification);
        }}
        dataNoti={dataEditNotification}
        type={ActionModal.EDIT}
        onSubmit={editNoti}
        isLoading={loadingNoti}
        isSuccessEdit={isSuccess}
      />
    </>
  );
}

export default TableNotifications;
