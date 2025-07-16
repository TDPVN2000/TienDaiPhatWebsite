import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import TablePolicy from "./components/TablePolicy";
import { listMasterPolicyKey } from "utils/queryKey";
import { useQuery } from "@tanstack/react-query";
import { getMasterPolicyApi } from "api/masterData";
import { TypeTabStaticPage } from "constants/enums";

interface IProps {
  onRefetch?: () => void;
  typeTab?: any;
}

export default function ListPolicy({ onRefetch, typeTab = "" }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const isTabPolicy =
    typeTab?.toString() === TypeTabStaticPage.POLICY.toString();

  const { data, isFetching, refetch } = useQuery({
    queryKey: [listMasterPolicyKey],
    queryFn: () => getMasterPolicyApi(),
    enabled: isTabPolicy,
  });

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <div className={styles.body}>
        <TablePolicy data={data} isLoading={false} />
      </div>
    </div>
  );
}
