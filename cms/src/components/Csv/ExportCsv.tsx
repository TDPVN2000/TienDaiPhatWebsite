import { Button } from "antd";
import { useRef } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

import { convertArrayToJsonCSV } from "utils/helper";

interface IProps {
  data: Record<string, string>[];
}

function ExportCsv(props: IProps) {
  const { data = [] } = props;
  const csvLinkRef = useRef<any>(null);
  const { t } = useTranslation();

  const downloadCsv = async () => {
    csvLinkRef.current?.link?.click();
  };

  return (
    <>
      <CSVLink
        ref={csvLinkRef}
        filename={"サンプルCSV.csv"}
        data={convertArrayToJsonCSV(data)}
        style={{ display: "none" }}
      />

      <Button type="primary" className="button" onClick={downloadCsv}>
        {t("common.exportCsv")}
      </Button>
    </>
  );
}

export default ExportCsv;
