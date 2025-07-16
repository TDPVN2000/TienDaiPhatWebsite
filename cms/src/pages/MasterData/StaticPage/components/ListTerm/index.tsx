import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import TableTerm from "./components/TableTerm";
import { listMasterTermKey } from "utils/queryKey";
import { useQuery } from "@tanstack/react-query";
import { getMasterTermApi } from "api/masterData";
import { TypeTabStaticPage } from "constants/enums";

interface IProps {
  onRefetch?: () => void;
  typeTab?: any;
}

export default function ListTerm({ onRefetch, typeTab = "" }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const isTabTerm = typeTab?.toString() === TypeTabStaticPage.TERM.toString();

  const { data, isFetching, refetch } = useQuery({
    queryKey: [listMasterTermKey],
    queryFn: () => getMasterTermApi(),
    enabled: isTabTerm,
  });

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <div className={styles.body}>
        <TableTerm data={data} isLoading={false} />
      </div>
    </div>
  );
}
