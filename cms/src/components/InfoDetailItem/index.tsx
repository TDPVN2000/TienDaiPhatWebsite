import classNames from "classnames";
import styles from "./styles.module.scss";
import { Image } from "antd";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface IImage {
  url?: string;
  type?: string;
  name?: string;
  size?: number;
  path?: string;
}
interface IProps {
  title?: any;
  titleRight?: any;
  content?: string | React.ReactNode;
  prefixContent?: string;
  multiInfo?: Array<any>;
  mailLink?: string;
  className?: string;
  isTitle?: boolean;
  widthStyle?: number;
  imageArr?: Array<IImage>;
  itemSizeWidth?: number | string;
  itemSizeHeight?: number | string;
  children?: ReactNode;
}

export function InfoDetailItem({
  title,
  titleRight,
  content,
  className,
  imageArr,
  mailLink,
  itemSizeWidth = 50,
  itemSizeHeight = 50,
  prefixContent,
  isTitle = true,
  multiInfo,
  children,
}: IProps) {
  return (
    <>
      {((title && (content || imageArr || multiInfo || mailLink)) ||
        (content && prefixContent)) && (
        <div className={classNames([styles.container, className])}>
          {title && isTitle ? (
            <div className={styles.viewTitle}>
              <div className={classNames([styles.labelData])}>{title}</div>
              {titleRight && (
                <div className={classNames([styles.titleRight])}>
                  {titleRight}
                </div>
              )}
            </div>
          ) : isTitle ? (
            <div className={classNames("h-26")} />
          ) : (
            <div />
          )}
          <div className={styles.viewContent} style={{ width: "100%" }}>
            {prefixContent && (
              <div className={styles.valueData}>{prefixContent}</div>
            )}
            {content && (
              <div
                className={classNames(
                  [
                    styles.valueData,
                    { [styles.valueData__bold]: prefixContent },
                  ],
                  [styles.valueData__long]
                )}
                style={{ width: "100%" }}
              >
                {content}
              </div>
            )}
          </div>
          {multiInfo && (
            <div className={styles.valueData}>{multiInfo?.toString()}</div>
          )}
          {mailLink && (
            <Link
              to={`mailto:${mailLink}`}
              target="_blank"
              className="text-link"
            >
              {mailLink}
            </Link>
          )}

          {imageArr && (
            <div className={classNames([styles.viewImages])}>
              {imageArr?.map((item: any, index: any) => {
                return (
                  <div key={index}>
                    {!!item?.path ? (
                      <div className={styles.imgCont}>
                        <Image
                          style={{
                            height: itemSizeHeight,
                            width: itemSizeWidth,
                          }}
                          alt=""
                          src={item?.path}
                        />
                      </div>
                    ) : item ? (
                      <div className={styles.imgCont}>
                        <Image
                          style={{
                            height: itemSizeHeight,
                            width: itemSizeWidth,
                            borderRadius: "8px",
                          }}
                          alt=""
                          src={item}
                        />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {children}
        </div>
      )}
    </>
  );
}
