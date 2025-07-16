import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import TableFaq from "./components/TableFaq";
import { listMasterQaKey } from "utils/queryKey";
import { useQuery } from "@tanstack/react-query";
import { getMasterQaApi } from "api/masterData";
import { TypeTabStaticPage } from "constants/enums";

interface IProps {
  onRefetch?: () => void;
  typeTab?: any;
}

export default function ListQa({ onRefetch, typeTab = "" }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const isTabFaq = typeTab?.toString() === TypeTabStaticPage.FAQ.toString();

  const { data, isFetching, refetch } = useQuery({
    queryKey: [listMasterQaKey],
    queryFn: () => getMasterQaApi(),
    enabled: isTabFaq,
  });

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <div className={styles.body}>
        <TableFaq data={data} isLoading={false} />
      </div>
    </div>
  );
}
