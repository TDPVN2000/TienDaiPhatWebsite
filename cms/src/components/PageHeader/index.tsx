import { Dropdown } from "antd";
import { ELocalStorageKey } from "constants/enums";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { IconArrowDown, IconLock, IconUserHeader, LogoApp } from "assets/icon";
import { useRole } from "utils/hooks/usePermissions";
import { useState } from "react";
import ModalChangePassword from "./components/ModalChangePassword";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "api/auth";
import { handleErrorMessage } from "utils/helper";
import ModalEditSuccess from "components/ModalEditSuccess";

export default function PageHeader() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [openModalEditSuccess, setOpenModalEditSuccess] =
    useState<boolean>(false);
  const [openModalChangePassword, setOpenModalChangePassword] =
    useState<boolean>(false);

  const role = useRole();
  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setOpenModalChangePassword(true);
          }}
          className={styles.viewBtnAction__changePassword}
        >
          <IconLock className={styles.iconAction__iconLock} />
          {t("common.changePassword")}
        </div>
      ),
    },
  ];

  const {
    mutate: changePassword,
    isLoading: loadingChangePassword,
    isSuccess,
  } = useMutation(changePasswordApi, {
    onSuccess: (data: any) => {
      setOpenModalChangePassword(false);
      setOpenModalEditSuccess(true);
    },
    onError: (err: any) => {
      handleErrorMessage(err);
    },
  });

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.viewNameStore}>
        <LogoApp className={styles.logoApp} />
        {/* <span className={styles.nameStore}>{t("common.webName")}</span> */}
      </div>
      {/* <div className={styles.actions}>
        <div className={styles.menuWrapper}>
          <div className={styles.menuItem}>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              overlayClassName={styles.dropdown}
              className={styles.dropdownOpen}
            >
              <div className={styles.interfaceDropdown}>
                <IconUserHeader />
                <span className={styles.nameAccount}>
                  {localStorage.getItem(ELocalStorageKey.USERNAME)}
                </span>
                <IconArrowDown />
              </div>
            </Dropdown>
          </div>
        </div>
      </div> */}
      <ModalChangePassword
        open={openModalChangePassword}
        toggle={() => {
          setOpenModalChangePassword(!openModalChangePassword);
        }}
        onSubmit={changePassword}
        isLoading={loadingChangePassword}
      />
      <ModalEditSuccess
        title="パスワード変更完了"
        content="パスワードの変更が完了しました"
        open={openModalEditSuccess}
        toggle={() => {
          setOpenModalEditSuccess(!openModalEditSuccess);
        }}
        onSubmit={() => setOpenModalEditSuccess(false)}
      />
    </div>
  );
}
