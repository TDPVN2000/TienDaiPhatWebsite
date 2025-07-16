import { Button } from "antd";
import classNames from "classnames";

import { ButtonType } from "constants/enums";
import styles from "./styles.module.scss";

interface IProps {
  title?: string;
  icon?: any;
  className?: string | any;
  onClick?: () => void;
  isLoading?: boolean;
  type?: ButtonType;
  disabled?: boolean;
  style?: any;
}

export default function CustomButton({
  title,
  icon,
  className,
  onClick,
  type,
  isLoading,
  disabled,
  style,
}: IProps) {
  return (
    <div
      className={classNames(
        styles.btnCustom,
        {
          [styles.btnOutline]: type === ButtonType.OUTLINE,
          [styles.btnAction]: type === ButtonType.ACTION,
          [styles.btnNoneRound]: type === ButtonType.NONE_ROUND,
          [styles.btnTabInactive]: type === ButtonType.TAB_INACTIVE,
          [styles.btnTabActive]: type === ButtonType.TAB_ACTIVE,
        },
        className
      )}
    >
      <Button
        icon={icon}
        onClick={onClick}
        loading={isLoading}
        disabled={disabled}
        style={style}
      >
        {title}
      </Button>
    </div>
  );
}
