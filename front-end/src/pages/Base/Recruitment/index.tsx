import PageHeader from 'components/Layout/PageHeader';
import styles from './styles.module.scss';
import PageFooter from 'components/Layout/PageFooter';
import { useTranslations } from 'next-intl';
import { images } from 'assets';
import { benefitsData } from 'constants/default-value';
import Treatment from './Components/Treatment/Treatment';
import RecruitmentList from './Components/RecruitmentList/RecruitmentList';

function Recruitment() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.headerBackground}>
        <PageHeader />
      </div>
      <div className={styles.body}>
        <RecruitmentList />
        <Treatment />
      </div>
      <PageFooter />
    </div>
  );
}

export default Recruitment;
