import React from "react";
import styles from "./styles.module.scss";
import { Image } from "antd";
import classNames from "classnames";
import { IImageItem } from "constants/interfaces";
import { images } from "assets";

interface IProps {
  images?: IImageItem[];
}
function ImagesDisplay(props: IProps) {
  const { images: initImages = [] } = props;
  if (!initImages?.length) return null;

  return (
    <div
      className={classNames([styles.container], {
        [styles.container3]: initImages?.length === 3,
        [styles.container2]: initImages?.length === 2,
        [styles.container1]: initImages?.length === 1,
      })}
    >
      <Image.PreviewGroup>
        {initImages.map((item: any, index: number) => {
          return (
            <Image
              src={item?.image || images.defaultImage}
              key={item?.id || index}
              className={styles.img}
              alt=""
              fallback={images.defaultImage}
            />
          );
        })}
      </Image.PreviewGroup>
    </div>
  );
}

export default ImagesDisplay;
