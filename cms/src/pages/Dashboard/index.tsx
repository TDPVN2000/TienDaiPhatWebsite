import HeaderContent from "components/HeaderContent";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import RevenueChart from "./component/RevenueChart";
import RevenueList from "./component/RevenueList";
import { useState } from "react";
import { TypeTabDashboard } from "constants/enums";
import { Tabs, TabsProps } from "antd";
import StatisticAccount from "./component/StatisticAccount";

export default function Dashboard() {
  const { t } = useTranslation();
  const [typeTabChoosing, setTypeTabChoosing] = useState<any>(
    TypeTabDashboard.STAFF.toString()
  );

  const handleChangeTab = (activeKey: any) => {
    setTypeTabChoosing(activeKey);
  };

  const itemTabs: TabsProps["items"] = [
    {
      key: `${TypeTabDashboard.STAFF}`,
      label: t("新規登録アカウント集計"),
      children: <StatisticAccount />,
    },
    {
      key: `${TypeTabDashboard.REVENUE}`,
      label: t("売上管理"),
      children: (
        <>
          <RevenueChart />
          <RevenueList />
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <HeaderContent title={t("revenues.title")} />
      <Tabs
        items={itemTabs}
        defaultActiveKey={TypeTabDashboard.STAFF.toString()}
        onChange={handleChangeTab}
        className={"tab-container mt-16 mb-16"}
      />
    </div>
  );
}
