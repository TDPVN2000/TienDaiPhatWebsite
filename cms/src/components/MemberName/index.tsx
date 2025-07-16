import { useTranslation } from "react-i18next";

interface IProps {
  userId?: string;
  nickname?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

const MemberName = ({
  userId,
  nickname,
  name,
  firstName,
  lastName,
}: IProps) => {
  const { t } = useTranslation();
  return userId ? (
    <>
      {nickname}
      <span className={"user-id"}>{`@${userId || ""}`}</span>
    </>
  ) : firstName || lastName ? (
    <>
      {t("common.fullName", {
        firstName: firstName || "",
        lastName: lastName || "",
      })}
    </>
  ) : (
    <>{name || ""}</>
  );
};

export default MemberName;
