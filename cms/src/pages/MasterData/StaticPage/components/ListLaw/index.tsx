import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import TableLaw from "./components/TableLaw";
import { listMasterLawKey } from "utils/queryKey";
import { useQuery } from "@tanstack/react-query";
import { getMasterLawApi } from "api/masterData";
import { TypeTabStaticPage } from "constants/enums";

interface IProps {
  onRefetch?: () => void;
  typeTab?: any;
}

export default function ListLaw({ onRefetch, typeTab = "" }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const isTabLaw =
    typeTab?.toString() === TypeTabStaticPage.COMMERCIAL_LAW.toString();

  const { data, isFetching, refetch } = useQuery({
    queryKey: [listMasterLawKey],
    queryFn: () => getMasterLawApi(),
    enabled: isTabLaw,
  });

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <div className={styles.body}>
        <TableLaw data={data} isLoading={false} />
      </div>
    </div>
  );
}
