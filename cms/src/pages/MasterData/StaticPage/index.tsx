import { Tabs, TabsProps } from "antd";
import HeaderContent from "components/HeaderContent";
import Loading from "components/Loading";
import { TypeTabStaticPage } from "constants/enums";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useState } from "react";
import ListTerm from "./components/ListTerm";
import ListPolicy from "./components/ListPolicy";
import ListLaw from "./components/ListLaw";
import ListFaq from "./components/ListFaq";
import useQueryParams from "utils/hooks/useQueryParams";
import { convertQueryDataObj, createQueryString } from "utils/helper";

export default function StaticPage() {
  const [t] = useTranslation();
  const { setQueryObject, getQueryString } = useQueryParams();
  const tabCurrent = convertQueryDataObj(getQueryString()) as any;
  const [typeTabChoosing, setTypeTabChoosing] = useState<any>(
    tabCurrent?.tab || TypeTabStaticPage.TERM.toString()
  );
  const itemTabs: TabsProps["items"] = [
    {
      key: `${TypeTabStaticPage.TERM}`,
      label: t("利用規約"),
    },
    {
      key: `${TypeTabStaticPage.POLICY}`,
      label: t("プライバシーポリシ"),
    },
    {
      key: `${TypeTabStaticPage.COMMERCIAL_LAW}`,
      label: t("特定商取引法の表示"),
    },
    {
      key: `${TypeTabStaticPage.FAQ}`,
      label: t("よくある質問 "),
    },
  ];

  const isTabTerm =
    typeTabChoosing?.toString() === TypeTabStaticPage.TERM.toString();
  const isTabPolicy =
    typeTabChoosing?.toString() === TypeTabStaticPage.POLICY.toString();
  const isTabLaw =
    typeTabChoosing?.toString() === TypeTabStaticPage.COMMERCIAL_LAW.toString();
  const isTabFaq =
    typeTabChoosing?.toString() === TypeTabStaticPage.FAQ.toString();

  const handleChangeTab = (activeKey: any) => {
    setTypeTabChoosing(activeKey);
    setQueryObject(createQueryString({ tab: activeKey }));
  };

  return (
    <div className={styles.container}>
      {false && <Loading />}
      <HeaderContent title={t("静的ページ")} />
      <Tabs
        items={itemTabs}
        activeKey={String(typeTabChoosing)}
        onChange={handleChangeTab}
        className={"tab-container mt-16 mb-16"}
      />
      {isTabTerm && <ListTerm typeTab={typeTabChoosing?.toString()} />}
      {isTabPolicy && <ListPolicy typeTab={typeTabChoosing?.toString()} />}
      {isTabLaw && <ListLaw typeTab={typeTabChoosing?.toString()} />}
      {isTabFaq && <ListFaq typeTab={typeTabChoosing?.toString()} />}
    </div>
  );
}
