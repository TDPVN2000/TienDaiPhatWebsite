import { images } from 'assets';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

function Introduction() {
  const { t } = useTranslation();

  return (
    <div className={styles.introduction}>
      <p className={styles.titleIntroduction}>{t('introduction.title')}</p>
      <img src={images.line} alt="line" className={styles.line} />
      <div className={styles.containerContent}>
        <div className={styles.viewContent1}>
          <div className={styles.content1}>
            <div className={styles.containerContent1}>
              <div className={styles.basicInfo}>
                <p>
                  {t('introduction.establishment')}
                  <strong>13/6/2017</strong>
                </p>
                <p>
                  {t('introduction.address')}
                  <strong>{t('introduction.detailAdd')}</strong>
                </p>
                <div className={styles.tagAmountMember}>
                  <h1 className={styles.amount}>400+</h1>
                  <h1 className={styles.member}>{t('common.employees')}</h1>
                </div>
              </div>
            </div>
          </div>
          <img
            src={images.imgIntroduction1}
            alt="introduction1"
            className={styles.imgIntroduction1}
          />
        </div>
        <div className={styles.viewContent2}>
          <img
            src={images.imgIntroduction2}
            alt="introduction2"
            className={styles.imgIntroduction2}
          />
          <div className={styles.content2}>
            <div className={styles.containerContent2}>
              <div className={styles.basicInfo}>
                <p>{t('introduction.content1')}</p>
                <p>{t('introduction.content2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
