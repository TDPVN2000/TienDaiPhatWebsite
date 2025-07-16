import { Image, ImageProps } from "antd";
import { images } from "assets";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface IProps extends ImageProps {
  avatar: any;
  className?: string;
  size?: number;
}

export default function CustomAvatar({
  avatar,
  className,
  size = 40,
  ...restProps
}: IProps) {
  return (
    <Image
      src={avatar || images.defaultAvatar}
      alt=""
      className={classNames(`w-${size} h-${size}`, styles.avatar, [className])}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = images.defaultAvatar;
      }}
      {...restProps}
    />
  );
}
