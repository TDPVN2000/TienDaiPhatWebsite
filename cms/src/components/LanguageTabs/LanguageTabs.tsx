import { Tabs, TabsProps } from "antd";
import { LanguageType } from "constants/enums";
import React, { ReactElement, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  children: ReactElement;
  activeTab?: LanguageType;
  changeAcceptLanguage?: (lng: LanguageType) => any;
}

const LanguageTabs = (props: IProps) => {
  const { children, changeAcceptLanguage } = props;
  const [activeTab, setActiveTab] = useState(
    props?.activeTab || LanguageType.JA
  );
  const { t } = useTranslation();

  const handleChangeTab = (activeKey: string) => {
    setActiveTab(activeKey as LanguageType);
    changeAcceptLanguage?.(activeKey as LanguageType);
  };

  const itemTabs: TabsProps["items"] = [
    {
      key: LanguageType.JA,
      label: t("common.japan"),
    },
    {
      key: LanguageType.KO,
      label: t("common.korea"),
    },
  ];

  return (
    <>
      <Tabs
        items={itemTabs}
        defaultActiveKey={activeTab}
        onChange={handleChangeTab}
      />
      {children}
      {/* {React.cloneElement(children, {
        languageTab: activeTab,
      })} */}
    </>
  );
};

export default LanguageTabs;
