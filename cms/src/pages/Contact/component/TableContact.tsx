import { useMutation } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import CustomNotification from "components/CustomNotification";
import CustomTable from "components/CustomTable";
import { UserPermissionType } from "constants/enums";
import { IContact, IFilter } from "constants/interfaces";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay, handleErrorMessage } from "utils/helper";
import { usePermissions, useRole } from "utils/hooks/usePermissions";
import useProfile from "utils/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { optionsDropdownContactStatus } from "utils/const/const";
import ModalDetailContact from "./ModalDetailContact";
import { Send } from "components/ActionTable/ActionTable";
import { Select } from "antd";
import classNames from "classnames";
import styles from "../styles.module.scss";
import { updateContactApi } from "api/contact";

interface IProps {
  data: any[];
  isLoading?: boolean;
  onChangeStatus?: (data: any) => void;
  onEdit?: (data: IContact) => void;
  filter: IFilter;
  onRefetch(): void;
}

function TableContact({
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
  const [openModalDetailContact, setOpenModalDetailContact] =
    useState<boolean>(false);
  const [dataDetailNotification, setDataDetailNotification] = useState<
    IContact | undefined
  >(undefined);

  const { mutate: changeStatusContact, isLoading: loadingChangeStatusContact } =
    useMutation(updateContactApi, {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        onRefetch();
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("contact.title"),
        dataIndex: "title",
        key: "title",
        width: 220,
      },
      {
        title: t("contact.content"),
        dataIndex: "content",
        key: "content",
        width: 360,
      },
      {
        title: t("contact.email"),
        dataIndex: "email",
        key: "email",
        width: 183,
      },
      {
        title: t("contact.sendAt"),
        dataIndex: "created_at",
        key: "created_at",
        render: (value: any, record: any, index: any) => (
          <div>{formatYearMonthDay(record?.created_at)}</div>
        ),
        width: 140,
      },
      {
        title: t("noti.status"),
        dataIndex: "status",
        key: "status",
        onCell: (record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
            },
          };
        },
        render: (value: any, record: any, index: any) => {
          return (
            <div>
              {
                optionsDropdownContactStatus?.find(
                  (item: any) => item?.value === record?.status
                )?.label
              }
            </div>
          );
        },
        width: 183,
      },
      {
        title: t(" "),
        onCell: (record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
            },
          };
        },
        render: (record: IContact) => (
          <Send onClick={() => navigate(`/contacts/detail/${record.id}`)} />
        ),
        width: 45,
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
          navigate(`/contacts/detail/${data.id}`);
        }}
      />
      <ModalDetailContact
        open={openModalDetailContact}
        dataItem={dataDetailNotification}
        toggle={() => {
          setOpenModalDetailContact(!openModalDetailContact);
        }}
        onSubmit={() => {
          setOpenModalDetailContact(false);
        }}
      />
    </>
  );
}

export default TableContact;
