import { images } from 'assets';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

interface Props {
  jobList: any[];
}

function RecruitmentList({ jobList }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/recruitment-detail/${id}`);
  };

  return (
    <div className={styles.containerListRecruitment}>
      <div className={styles.jobList}>
        <p className={styles.title}>{t('recruitment.title')}</p>
        <img src={images.line} alt="line" className={styles.line} />

        <div className={`${styles.jobItem} ${styles.jobItemLabel}`}>
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

        <div className={styles.mobileJobLabel}>
          {t('recruitment.listRecruitment')}
        </div>

        {jobList.length > 0 ? (
          jobList.map((job: any, index: number) => (
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
          ))
        ) : (
          <p className={styles.noData}>{t('news.noData')}</p>
        )}
      </div>
    </div>
  );
}

export default RecruitmentList;
