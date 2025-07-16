import { Tabs, TabsProps } from "antd";
import HeaderContent from "components/HeaderContent";
import Loading from "components/Loading";
import { ActionModal, TypeTabCategory } from "constants/enums";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { handleErrorMessage } from "utils/helper";
import styles from "./styles.module.scss";
import { useState } from "react";
import ListCategoryStore from "./components/ListCategoryStore";
import ListCategoryWorker from "./components/ListCategoryWorker";
import ModalEditCategory from "./components/ModalEditCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomNotification from "components/CustomNotification";
import { createCateStoreApi, createCateWorkerApi } from "api/masterData";
import {
  listMasterCateStoreKey,
  listMasterCateWorkerKey,
} from "utils/queryKey";

export default function Category() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [typeTabChoosing, setTypeTabChoosing] = useState<any>(
    TypeTabCategory.STORE.toString()
  );
  const [openModalEditCate, setOpenModalEditCate] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const itemTabs: TabsProps["items"] = [
    {
      key: `${TypeTabCategory.STORE}`,
      label: t("お店のカテゴリー"),
    },
    {
      key: `${TypeTabCategory.WORKER}`,
      label: t("お手伝いのカテゴリー"),
    },
  ];
  const isTabCateStore =
    typeTabChoosing?.toString() === TypeTabCategory.STORE.toString();

  const onClickEdit = () => setOpenModalEditCate(true);

  const handleChangeTab = (activeKey: any) => {
    setTypeTabChoosing(activeKey);
  };

  const createCate = (dataForm: any) => {
    if (isTabCateStore) {
      createCateStore(dataForm);
    } else {
      createCateWorker(dataForm);
    }
  };

  const { mutate: createCateWorker, isLoading: loadingCreateCateWorker } =
    useMutation(createCateWorkerApi, {
      onSuccess: (data: any) => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        queryClient.invalidateQueries([listMasterCateWorkerKey]);
        setOpenModalEditCate(false);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  const { mutate: createCateStore, isLoading: loadingCreateCateStore } =
    useMutation(createCateStoreApi, {
      onSuccess: (data: any) => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        queryClient.invalidateQueries([listMasterCateStoreKey]);
        setOpenModalEditCate(false);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    });

  return (
    <div className={styles.container}>
      {(loadingCreateCateWorker || loadingCreateCateStore) && <Loading />}
      <HeaderContent
        title={t("カテゴリー")}
        buttonAdd={{
          title: t("カテゴリー登録"),
          onClick: onClickEdit,
        }}
      />
      <Tabs
        items={itemTabs}
        activeKey={String(typeTabChoosing)}
        onChange={handleChangeTab}
        className={"tab-container mt-16 mb-16"}
      />
      {isTabCateStore && (
        <ListCategoryStore typeTab={typeTabChoosing?.toString()} />
      )}
      {!isTabCateStore && (
        <ListCategoryWorker typeTab={typeTabChoosing?.toString()} />
      )}
      <ModalEditCategory
        open={openModalEditCate}
        toggle={() => {
          setOpenModalEditCate(!openModalEditCate);
        }}
        onSubmit={createCate}
        title={t("カテゴリー登録")}
        isLoading={false}
        type={ActionModal.CREATE}
      />
    </div>
  );
}
