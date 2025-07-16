import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import useFilter from "utils/hooks/useFilter";
import { useQuery } from "@tanstack/react-query";
import { accountYearKey } from "utils/queryKey";
import { getAccountYearApi, getCsvStatisticAccountApi } from "api/revenue";
import { DatePicker } from "antd";
import { Icon } from "@ant-design/compatible";
import { IconArrowDropDown } from "assets/icon";
import dayjs from "dayjs";
import { optionAccountStatistic, urlExcelStatistic } from "utils/const/const";
import { Column } from "@ant-design/charts";
import HeaderContent from "components/HeaderContent";
import { downloadFileXmlRequest } from "utils/helper";

export default function StatisticAccount() {
  const { t } = useTranslation();

  const { filter, handleSearch } = useFilter({
    page: 1,
    size: 10,
  });

  const { data: dataAccount, isFetching } = useQuery({
    queryKey: [accountYearKey, filter],
    queryFn: () => getAccountYearApi(filter),
    onSuccess: (res) => {
      handleGenerateData(res);
    },
  });

  const handleGenerateData = (dataAccountCurrent: any) => {
    let newDataAccount: any[] = [];
    (dataAccountCurrent?.data || [])?.forEach((item: any, index: any) => {
      const keysToInclude = Object.keys(item)?.filter(
        (key: any) => key !== "month"
      );
      const dataAccountPerMonth = keysToInclude?.map((key: any) => {
        const newObj = { month: `${Number(item?.month)}月` } as any;
        newObj[`value`] = item?.[key];
        newObj[`type`] = (optionAccountStatistic as any)?.[key];
        return newObj;
      });
      newDataAccount = [...newDataAccount, ...dataAccountPerMonth];
    });
    return newDataAccount;
  };

  const config = {
    data: handleGenerateData(dataAccount),
    xField: "month",
    yField: "value",
    seriesField: "type",
    isGroup: true,
    colorField: "type",
    legend: {
      position: "top-left",
      padding: [32, 0, 32, 0],
    } as any,
    color: ["#00A2D1", "#50C238", "#F08437"],
  };

  return (
    <div className={styles.container}>
      <div className={styles.viewDetailAccountYear}>
        <div className={styles.viewInfoAccount__user}>
          <div className={styles.title}>{t("dashboard.user")}</div>
          <div className={styles.body}>
            <div>{dataAccount?.total?.users || 0}</div>
            <div className={styles.unit}>{t("dashboard.unit")}</div>
          </div>
        </div>
        <div className={styles.viewInfoAccount__store}>
          <div className={styles.title}>{t("dashboard.store")}</div>
          <div className={styles.body}>
            <div>{dataAccount?.total?.stores || 0}</div>
            <div className={styles.unit}>{t("dashboard.unit")}</div>
          </div>
        </div>
        <div className={styles.viewInfoAccount__shipper}>
          <div className={styles.title}>{t("dashboard.shipper")}</div>
          <div className={styles.body}>
            <div>{dataAccount?.total?.shippers || 0}</div>
            <div className={styles.unit}>{t("dashboard.unit")}</div>
          </div>
        </div>
      </div>
      <HeaderContent
        title=""
        buttonAdd={{
          title: t("Excel出力"),
          onClick: () =>
            downloadFileXmlRequest({
              url: urlExcelStatistic.account,
              nameFile: `${
                filter?.year || dayjs(filter?.year).format("YYYY")
              }_新規登録アカウント集計_出力.xlsx`,
              filter: {
                ...(typeof filter?.status === "boolean"
                  ? { status: filter?.status }
                  : {}),
                ...(filter?.keyword ? { keyword: filter?.keyword } : {}),
                year: `${filter?.year || dayjs(filter?.year).format("YYYY")}`,
              },
            }),
        }}
      />
      <div className={styles.chart} style={{ height: "523px", width: "100%" }}>
        <div className={styles.viewFilterBody}>
          <DatePicker
            className="datePickerCustom w-230 h-48"
            suffixIcon={<Icon component={() => <IconArrowDropDown />} />}
            placeholder={t("placeholders.year")}
            inputReadOnly
            picker="year"
            format={"YYYY 年"}
            defaultValue={dayjs()}
            onChange={(value: any) =>
              handleSearch.yearSearch(dayjs(value).format("YYYY"))
            }
            allowClear={false}
          />
        </div>
        <Column {...config} />
      </div>
      <div className={styles.viewBottom} />
    </div>
  );
}
