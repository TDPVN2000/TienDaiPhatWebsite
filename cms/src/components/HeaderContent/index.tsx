import { Row, RowProps } from "antd";
import { IconArrowLeft } from "assets/icon";
import classNames from "classnames";
import CustomButton from "components/CustomButton";
import { ButtonType } from "constants/enums";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface IProps {
  title: string;
  buttonAdd?: {
    title: string;
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
  };
  buttonCancel?: {
    title: string;
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
  };
  children?: ReactNode;
  childrenRight?: ReactNode;
  hasBack?: boolean;
  urlBack?: string;
  onGoBack?: any;
  hasIconAdd?: boolean;
  className?: string;
  classButton?: string;
  justifyChildren?: RowProps["justify"];
}

function HeaderContent({
  title,
  buttonAdd,
  buttonCancel,
  children,
  hasBack = false,
  urlBack,
  hasIconAdd = false,
  childrenRight,
  className,
  classButton,
  onGoBack,
  justifyChildren = "end",
}: IProps) {
  const navigate = useNavigate();

  const goBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (urlBack) {
      navigate(urlBack);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={classNames([styles.container, className])}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="" />
      </Helmet>
      <Row align="middle" justify="space-between">
        <Row align={"middle"}>
          {hasBack && (
            <IconArrowLeft
              onClick={goBack}
              className={classNames("mr-8 text-20")}
              style={{ cursor: "pointer" }}
            />
          )}
          <div className={styles.title}>{title}</div>
        </Row>
        <div className={styles.viewBtn}>
          {buttonCancel?.title && (
            <CustomButton
              title={buttonCancel?.title}
              onClick={buttonCancel?.onClick}
              type={ButtonType.OUTLINE}
              className="mr-8"
              isLoading={buttonCancel?.isLoading}
            />
          )}
          {buttonAdd?.title ? (
            <CustomButton
              title={buttonAdd?.title}
              onClick={buttonAdd?.onClick}
              isLoading={buttonAdd?.isLoading}
              disabled={buttonAdd?.disabled}
              className={{
                [styles.btnDisabled]: buttonAdd?.disabled,
              }}
            />
          ) : (
            <div className="h-45" />
          )}
        </div>
        {childrenRight}
      </Row>
      {children && (
        <Row
          align="middle"
          justify={justifyChildren}
          className={classNames("mt-10", [styles.search])}
        >
          {children}
        </Row>
      )}
    </div>
  );
}

export default HeaderContent;
