import classNames from "classnames";
import styles from "./styles.module.scss";

interface IProps {
  title: string;
  isRequired?: boolean;
  className?: string;
}

export default function LabelInput({ title, isRequired, className }: IProps) {
  return (
    <div className={classNames([styles.container, className])}>
      <span className={styles.title}>{title}</span>
      {isRequired ? <span className={styles.required}>*</span> : null}
    </div>
  );
}
