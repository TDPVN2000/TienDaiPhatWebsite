import PageFooter from 'components/Layout/PageFooter';
import PageHeader from 'components/Layout/PageHeader';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDetailRecruitmentApi } from 'api/recruitment';
import { detailRecruitmentKey } from 'utils/queryKey';
import { images } from 'assets';

function RecruitmentDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // !TODO: Call API Detail Recruitment
  // const { data: dataDetailRecruitment, refetch } = useQuery(
  //   [detailRecruitmentKey],
  //   () => getDetailRecruitmentApi(id)
  // );

  return (
    <div className={styles.container}>
      <PageHeader isDetail={true} />
      <div className={styles.body}>
        <div className={styles.headerBack}>
          <img
            src={images.arrowLeft}
            alt="arrowLeft"
            className={styles.arrowLeft}
            onClick={() => navigate(-1)}
          />
          <p className={styles.titleBack}>{t('recruitment.titleBack')}</p>
        </div>
        <div className={styles.content}>
          <p>{`ID recruitment: ${id}`}</p>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

export default RecruitmentDetail;
