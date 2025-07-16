import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
  LockOutlined,
  StopOutlined,
  UndoOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

import { Button, Popconfirm } from "antd";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IconEdit, IconSend, IconMinusCircle, IconTrash } from "assets/icon";

interface IProps {
  onClick: (data: any) => any;
  textConfirm?: string;
  className?: string;
  classNameIcon?: string;
  disabled?: boolean;
}

interface IDeleteProps {
  onDelete: (data: any) => any;
  textConfirm?: string;
  className?: string;
  classNameIcon?: string;
}

function Unlock({ onClick, className, classNameIcon }: IProps) {
  return (
    <Button
      type="text"
      className={classNames("p-4", className)}
      onClick={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      <UnlockOutlined className={classNames([styles.icon, classNameIcon])} />
    </Button>
  );
}

function Edit({ onClick, className, disabled, classNameIcon }: IProps) {
  return (
    <Button
      disabled={disabled ? disabled : false}
      type="text"
      className={classNames("p-4", className)}
      onClick={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      <IconEdit className={classNames([styles.icon, classNameIcon])} />
    </Button>
  );
}

function Delete({
  textConfirm,
  onDelete,
  className,
  classNameIcon,
}: IDeleteProps) {
  const { t } = useTranslation();

  return (
    <Button
      type="text"
      className={classNames("p-4", className)}
      onClick={(e: any) => {
        e.stopPropagation();
        onDelete(e);
      }}
    >
      <IconTrash className={classNames([styles.icon, classNameIcon])} />
    </Button>
  );
}

function Minus({ onClick, className, classNameIcon }: IProps) {
  const { t } = useTranslation();

  return (
    <Button
      type="text"
      className={classNames("p-4", className)}
      onClick={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      <IconMinusCircle className={classNames([styles.icon, classNameIcon])} />
    </Button>
  );
}

function Send({ textConfirm, onClick, className, classNameIcon }: IProps) {
  const { t } = useTranslation();

  return (
    <Button
      type="text"
      className={classNames("p-4", className)}
      onClick={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      <IconSend className={classNames([styles.icon, classNameIcon])} />
    </Button>
  );
}

function Detail({ onClick, className, classNameIcon }: IProps) {
  return (
    <Button
      type="text"
      className={classNames("p-4", className)}
      onClick={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      <EyeOutlined
        className={classNames([styles.icon__detail, classNameIcon])}
      />
    </Button>
  );
}

function Disabled({
  textConfirm = "こちらを消除してもよろしいでしょうか？",
  onClick,
  className,
  classNameIcon,
}: IProps) {
  const { t } = useTranslation();

  return (
    <Popconfirm
      title={textConfirm}
      placement="topLeft"
      onConfirm={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
      onCancel={(e: any) => {
        e.stopPropagation();
      }}
      cancelText={t("button.cancel")}
    >
      <Button
        type="text"
        className={classNames("p-4", className)}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <StopOutlined
          className={classNames([styles.icon__detail, classNameIcon])}
        />
      </Button>
    </Popconfirm>
  );
}

function Block({ textConfirm, onClick, className, classNameIcon }: IProps) {
  const { t } = useTranslation();

  return (
    <Popconfirm
      title={textConfirm}
      placement="topLeft"
      onConfirm={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
      onCancel={(e: any) => {
        e.stopPropagation();
      }}
      cancelText={t("button.cancel")}
    >
      <Button
        type="text"
        className={classNames("p-4", className)}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <UnlockOutlined
          className={classNames([styles.icon__detail_block, classNameIcon])}
        />
      </Button>
    </Popconfirm>
  );
}

function UnBlock({ textConfirm, onClick, className, classNameIcon }: IProps) {
  const { t } = useTranslation();

  return (
    <Popconfirm
      title={textConfirm}
      placement="topLeft"
      onConfirm={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
      onCancel={(e: any) => {
        e.stopPropagation();
      }}
      cancelText={t("button.cancel")}
    >
      <Button
        type="text"
        className={classNames("p-4", className)}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <LockOutlined
          className={classNames([styles.icon__detail_block, classNameIcon])}
        />
      </Button>
    </Popconfirm>
  );
}

function Copy({ onClick, className, classNameIcon }: IProps) {
  return (
    <Button
      type="text"
      className={classNames("p-4", className)}
      onClick={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      <CopyOutlined
        className={classNames([styles.icon__detail, classNameIcon])}
      />
    </Button>
  );
}

function Undo({ onClick, className, textConfirm, classNameIcon }: IProps) {
  return (
    <Popconfirm
      title={textConfirm}
      placement="topLeft"
      onConfirm={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
      onCancel={(e: any) => {
        e.stopPropagation();
      }}
    >
      <Button
        type="text"
        className={classNames("p-4", className)}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <UndoOutlined className={classNames([styles.icon, classNameIcon])} />
      </Button>
    </Popconfirm>
  );
}

function Approve({ onClick, className }: IProps) {
  return (
    <Button
      type="text"
      className={classNames("p-4", className)}
      onClick={(e: any) => {
        onClick(e);
      }}
    >
      <CheckOutlined className={styles.icon} style={{ color: "green" }} />
    </Button>
  );
}

export const ConfirmButton = ({
  onClick,
  className,
  title,
  textConfirm,
  ...restProps
}: any) => {
  return (
    <Popconfirm
      title={textConfirm}
      placement="topLeft"
      onConfirm={(e: any) => {
        e.stopPropagation();
        onClick(e);
      }}
      onCancel={(e: any) => {
        e.stopPropagation();
      }}
    >
      <Button
        type="primary"
        className={classNames([styles.actionButton, className])}
        {...restProps}
      >
        {title}
      </Button>
    </Popconfirm>
  );
};

export {
  Unlock,
  Edit,
  Delete,
  Detail,
  Disabled,
  Block,
  UnBlock,
  Copy,
  Undo,
  Approve,
  Send,
  Minus,
};
