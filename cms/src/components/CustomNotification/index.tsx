import { notification } from "antd";

interface IProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description?: string;
}

const CustomNotification = ({ type, message, description }: IProps) => {
  notification.destroy();
  if (type === "success") {
    return notification[type]({
      message,
    });
  }
  return notification[type]({
    message,
    description,
  });
};

export default CustomNotification;
