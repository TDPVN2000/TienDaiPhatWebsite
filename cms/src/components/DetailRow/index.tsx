import classNames from "classnames";
import styles from "./styles.module.scss";
import { COMMON_STATUS, DetailRowType } from "constants/enums";

interface IProps {
  label: string;
  value?: string | COMMON_STATUS;
  className?: string;
  classNameValue?: string;
  type?: DetailRowType;
  renderValue?: any;
  onClickValue?: any;
}

export default function DetailRow({
  label,
  value,
  className,
  type,
  renderValue,
  classNameValue,
  onClickValue,
}: IProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.label}>{label ? `${label}:` : ""}</div>
      {renderValue ? (
        renderValue
      ) : (
        <div
          className={classNames([styles.value, classNameValue])}
          onClick={onClickValue}
        >
          {value}
        </div>
      )}
    </div>
  );
}
