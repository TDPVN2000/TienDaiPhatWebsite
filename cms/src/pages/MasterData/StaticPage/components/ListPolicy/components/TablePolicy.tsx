import { Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { Edit } from "components/ActionTable/ActionTable";
import CustomTable from "components/CustomTable";
import { ELocalStorageKey, ROLE_TYPE } from "constants/enums";
import { IFilter } from "constants/interfaces";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay, htmlToText } from "utils/helper";
import { useNavigate } from "react-router-dom";
import { objectMasterData } from "utils/const/const";

interface IProps {
  data: any[];
  isLoading?: boolean;
  onChangeStatus?: (data: any) => void;
  onEdit?: (data: any) => void;
  filter?: IFilter;
  onRefetch?(): void;
}

function TablePolicy({
  data,
  isLoading,
  onChangeStatus,
  onEdit,
  filter,
  onRefetch,
}: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const role = localStorage.getItem(ELocalStorageKey.ROLE_TYPE);
  const isAdmin = role === ROLE_TYPE.ADMIN;

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: t("内容"),
        dataIndex: "content",
        key: "content",
        render: (value: any, record: any, index: any) => (
          <div className="line-2">{htmlToText(record?.content)}</div>
        ),
        width: "54%",
      },
      {
        title: t("対象者"),
        dataIndex: "type",
        key: "type",
        render: (value: any, record: any, index: any) => (
          <div>
            {
              objectMasterData?.find(
                (item: any) => item?.value === record?.type
              )?.label
            }
          </div>
        ),
        width: "20%",
      },
      {
        title: t("更新日"),
        dataIndex: "updated_at",
        key: "updated_at",
        render: (value: any, record: any, index: any) => (
          <div>{formatYearMonthDay(record?.updated_at)}</div>
        ),
        width: "20%",
      },
      {
        title: " ",
        key: "action",
        width: "6%",
        align: "center" as any,
        onCell: (record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
            },
          };
        },
        render: (record: any) => (
          <Row justify="start">
            <Edit
              onClick={() =>
                navigate(`/master-data/static-page/policy-edit/${record?.type}`)
              }
            />
          </Row>
        ),
      },
    ];
  }, [filter, role]);

  return (
    <>
      <CustomTable columns={columns} dataSource={data} isLoading={isLoading} />
    </>
  );
}

export default TablePolicy;
