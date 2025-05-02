import { images } from 'assets';
import { benefitsData } from 'constants/default-value';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';

function Treatment() {
  const t = useTranslations();

  return (
    <div className={styles.containerTreatment}>
      <div className={styles.contentTreatment}>
        <p className={styles.titleTreatment}>
          {t('recruitment.titleTreatment')}
        </p>
        <img src={images.lineWhite} alt="line" className={styles.line} />
        <div>
          <p className={styles.introduceTreatment}>
            {t('recruitment.introduceTreatment')}
          </p>
          <div className={styles.benefitsContainer}>
            {benefitsData.map((benefit, index) => (
              <div key={index} className={styles.benefitSection}>
                <h2>
                  {index + 1}. {benefit.title}
                </h2>
                <ul>
                  {benefit.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.noteTreatment}>{t('recruitment.note')}</p>
        </div>
      </div>
      <div className={styles.viewBGImage}>
        <img
          src={images.bgRecruitment}
          alt="vision_mission"
          className={styles.styleBgRecruitment}
        />
      </div>
    </div>
  );
}

export default Treatment;
