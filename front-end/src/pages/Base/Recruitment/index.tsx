import { useQuery } from '@tanstack/react-query';
import { getRecruitmentListApi } from 'api/recruitment';
import PageFooter from 'components/Layout/PageFooter';
import PageHeader from 'components/Layout/PageHeader';
import Loading from 'components/Loading';
import { useTranslation } from 'react-i18next';
import { listRecruitmentKey } from 'utils/queryKey';
import RecruitmentList from './Components/RecruitmentList/RecruitmentList';
import Treatment from './Components/Treatment/Treatment';
import styles from './styles.module.scss';
import { JOBSLIST } from 'constants/default-value';

function Recruitment() {
  const { t, i18n } = useTranslation();

  // !TODO: Call API List Recruitment
  const { data: jobList = [], isLoading: isLoadingJobList } = useQuery({
    queryKey: [listRecruitmentKey, i18n.language],
    queryFn: () => getRecruitmentListApi({ language: i18n.language }),
  });

  if (isLoadingJobList) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerBackground}>
        <PageHeader />
      </div>
      <div className={styles.body}>
        <RecruitmentList jobList={jobList} />
        <Treatment />
      </div>
      <PageFooter />
    </div>
  );
}

export default Recruitment;
