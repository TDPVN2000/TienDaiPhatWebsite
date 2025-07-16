import { IconDrag } from "assets/icon";
import styles from "../styles.module.scss";
import { Draggable } from "@hello-pangea/dnd";
import {
  formatYearMonthDay,
  getErrorMessage,
  handleErrorMessage,
} from "utils/helper";
import dayjs from "dayjs";
import classNames from "classnames";
import { Row } from "antd";
import { Delete, Edit } from "components/ActionTable/ActionTable";
import ModalEditCategory from "pages/MasterData/Category/components/ModalEditCategory";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import CustomNotification from "components/CustomNotification";
import ModalAlertDeleteCate from "pages/MasterData/Category/components/ModalAlertDeleteCate";
import { deleteCateWorkerApi, updateCateWorkerApi } from "api/masterData";
import ModalDeleteItem from "components/ModalDeleteItem";
import { ActionModal } from "constants/enums";

const DraggableCateWorker = (props: any) => {
  const { id, index, data, onRefetch } = props;
  const [openModalEditCate, setOpenModalEditCate] = useState<boolean>(false);
  const [openModalAlertDeleteCate, setOpenModalAlertDeleteCate] =
    useState<boolean>(false);
  const [openModalDeleteCate, setOpenModalDeleteCate] =
    useState<boolean>(false);

  const [errDeleteCate, setErrDeleteCate] = useState<string>();

  const [t] = useTranslation();

  const handleEditCate = async (dataForm: any) => {
    await updateCateWorkerApi({
      cateId: data?.id,
      params: dataForm,
    });
  };

  const { mutate: deleteCate, isLoading: loadingDeleteCate } = useMutation(
    deleteCateWorkerApi,
    {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        setOpenModalDeleteCate(false);
        onRefetch();
      },
      onError: (err: any) => {
        setOpenModalDeleteCate(false);
        setErrDeleteCate(getErrorMessage(err) || err);
        setOpenModalAlertDeleteCate(true);
      },
    }
  );

  const { mutate: editCate, isLoading: loadingEditCate } = useMutation(
    handleEditCate,
    {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        setOpenModalEditCate(false);
        onRefetch();
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    }
  );

  return (
    <>
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <div
            className={styles.itemList}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              {...provided.dragHandleProps}
              className={classNames([styles.icon])}
              style={{ width: "5%" }}
            >
              <IconDrag />
            </div>
            <div style={{ width: "30%" }}>{data?.category_name}</div>
            <div style={{ width: "25%" }}>{index + 1}</div>
            <div style={{ width: "25%" }}>
              {data?.updated_at ? formatYearMonthDay(data?.updated_at) : ""}
            </div>
            <div style={{ width: "15%" }}>
              <Row justify="start">
                <Edit onClick={() => setOpenModalEditCate(true)} />
                <Delete onDelete={() => setOpenModalDeleteCate(true)} />
              </Row>
            </div>
          </div>
        )}
      </Draggable>
      <ModalEditCategory
        dataItem={data}
        open={openModalEditCate}
        toggle={() => {
          setOpenModalEditCate(!openModalEditCate);
        }}
        onSubmit={editCate}
        title={t("カテゴリー編集")}
        isLoading={loadingEditCate}
        type={ActionModal.EDIT}
      />
      <ModalDeleteItem
        open={openModalDeleteCate}
        dataItem={data}
        toggle={() => {
          setOpenModalDeleteCate(!openModalDeleteCate);
        }}
        onSubmit={deleteCate}
        title={t("このカテゴリーを削除しますか？")}
        isLoading={loadingDeleteCate}
      />
      <ModalAlertDeleteCate
        open={openModalAlertDeleteCate}
        toggle={() => {
          setOpenModalAlertDeleteCate(!openModalAlertDeleteCate);
        }}
        title={errDeleteCate}
      />
    </>
  );
};

export default DraggableCateWorker;
