import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { convertJaMoney, formatCurrencyJapanese } from "utils/helper";
import useFilter from "utils/hooks/useFilter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { revenueYearKey } from "utils/queryKey";
import { getRevenueYearApi } from "api/revenue";
import { labels } from "utils/const/const";
import { DatePicker } from "antd";
import { Icon } from "@ant-design/compatible";
import { IconArrowDropDown } from "assets/icon";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueChart() {
  const { t } = useTranslation();

  const [curData, setCurData] = useState<{
    totalRevenue: any;
    datasets: Array<any>;
  }>({
    totalRevenue: 0,
    datasets: [],
  });

  const { filter, handleSearch } = useFilter({
    page: 1,
    size: 10,
  });

  const { data, isFetching } = useQuery({
    queryKey: [revenueYearKey, filter],
    queryFn: () => getRevenueYearApi(filter),
    onSuccess: (res) => {
      handleGenerateData(res);
    },
  });

  const handleGenerateData = (listRevenueStatistic: any) => {
    const listData: any[] = [];
    let totalRevenues = 0;
    (listRevenueStatistic || [])?.forEach((item: any) => {
      listData.push(Number(item.total_revenue));
      totalRevenues += Number(item.total_revenue);
    });
    setCurData({
      totalRevenue: totalRevenues,
      datasets: [
        {
          label: "Dataset Revenues",
          data: listData,
          borderColor: "#26418E",
          tension: 0.3,
          pointBackgroundColor: "#26418E",
          pointBorderWidth: 3,
          lineWidth: 1,
          fill: "start",
          lineTension: 0.3,
          borderWidth: 1.5,
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 255, 4, 0);
            gradient.addColorStop(1, "rgba(255, 158, 62, 1)");
            gradient.addColorStop(0, "rgba(255, 158, 62, 0.1)");
            return gradient;
          },
        },
      ],
    });
  };

  const optionDefault: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false, position: "bottom" as const },
      tooltip: {
        backgroundColor: "#FFFFFF",
        displayColors: false,
        titleColor: "#272122",
        titleAlign: "left",
        titleFont: {
          weight: 700 as any,
          size: 14,
        },
        bodyAlign: "left",
        bodyColor: "#26418E",
        bodyFont: {
          size: 16,
          weight: 700 as any,
        },
        cornerRadius: 16,
        position: "average",
        yAlign: "bottom",
        callbacks: {
          label(tooltipItems) {
            return `¥ ${tooltipItems.formattedValue}`;
          },
          title() {
            return String(t("revenues.chartTooltipTitle"));
          },
        },
        borderColor: "rgba(0, 0, 0, 0.15)",
        borderWidth: 1,
        padding: {
          left: 15,
          top: 10,
          right: 15,
          bottom: 10,
        },
      },
    },
    line: {
      datasets: {},
    },
    layout: {},
    scales: {
      y: {
        title: { display: false, text: "Amount" },
        grid: { color: "#C0C0C0" },
        border: { dash: [6, 8] },
        min: 0,
        // max: maxRevenue,
        ticks: {
          callback(tickValue, index, ticks) {
            return convertJaMoney(Number(tickValue));
          },
          font: {
            family: "Noto Sans JP",
            size: 14,
            weight: 400 as any,
          },
          padding: 15,
          color: "#2E2E2E",
        },
      },
      x: {
        title: { display: false, text: "Ages" },
        grid: { color: "#d9d9d9" },
        border: { dash: [6, 8] },
        ticks: {
          callback(tickValue, index, ticks) {
            return `${Number(tickValue) + 1}月`;
          },
          font: {
            size: 14,
            weight: 400 as any,
            family: "Noto Sans JP",
          },
          padding: 15,
          color: "#2E2E2E",
        },
      },
    },
  };

  return (
    <>
      <div className={styles.viewFilter}>
        <div className={styles.viewTotalRevenueYear}>
          <span className={styles.titleTotalRevenueYear}>
            {t("revenues.newTotalRevenue")}
          </span>
          <span className={styles.totalRevenueYear}>
            {formatCurrencyJapanese(curData?.totalRevenue || 0)}
          </span>
        </div>
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
      </div>
      <div className={styles.chart} style={{ height: "523px", width: "100%" }}>
        <Line
          options={optionDefault}
          data={{ labels, datasets: curData?.datasets }}
        />
      </div>
    </>
  );
}
