import { images } from 'assets';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
import { JOBSLIST } from 'constants/default-value';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecruitmentListApi } from 'api/recruitment';
import { listRecruitmentKey } from 'utils/queryKey';

function RecruitmentList() {
  const t = useTranslations();
  const navigate = useNavigate();

  // !TODO: Call API List Recruitment
  // const { data, isFetching, refetch } = useQuery({
  //   queryKey: [listRecruitmentKey],
  //   queryFn: () => getRecruitmentListApi(),
  // });

  const handleClick = (id: number) => {
    navigate(`/recruitment-detail/${id}`);
  };

  return (
    <div className={styles.containerListRecruitment}>
      <div className={styles.jobList}>
        <p className={styles.title}>{t('recruitment.title')}</p>
        <img src={images.line} alt="line" className={styles.line} />
        <div className={styles.jobItem}>
          <div className={styles.jobPosition}>
            <p className={styles.label}>{t('recruitment.position')}</p>
          </div>
          <div className={`${styles.jobAddress} ${styles.labelAddress}`}>
            <p className={styles.label}>{t('recruitment.address')}</p>
          </div>
          <div className={`${styles.viewBtnDetail} ${styles.labelDetail}`}>
            <p className={styles.label}>{t('recruitment.detail')}</p>
          </div>
        </div>
        {JOBSLIST.map((job, index) => (
          <div className={styles.jobItem} key={index}>
            <div className={styles.jobPosition}>
              <div className={styles.txtPosition}>{job?.position}</div>
              <div className={styles.txtDesPosition}>{job?.des_position}</div>
            </div>
            <div className={styles.jobAddress}>{job?.address}</div>
            <div className={styles.viewBtnDetail}>
              <button
                onClick={() => handleClick(job?.id)}
                className={styles.styleBtn}
              >
                {t('button.viewDetail')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecruitmentList;
