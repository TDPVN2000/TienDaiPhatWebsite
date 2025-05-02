import React from 'react';
import styles from './styles.module.scss';
import { images } from 'assets';
import { useTranslations } from 'next-intl';

function Introduction() {
  const t = useTranslations();

  return (
    <div className={styles.introduction}>
      <p className={styles.titleIntroduction}>{t('introduction.title')}</p>
      <img src={images.line} alt="line" />
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
                  <strong>
                    Số 11/18/199 Đường Hồ Tùng Mậu, Phường Cầu Diễn, Quận Nam Từ
                    Liêm, Thành phố Hà Nội, Việt Nam
                  </strong>
                </p>
                <div className={styles.tagAmountMember}>
                  <h1 className={styles.amount}>400+</h1>
                  <h1 className={styles.member}>nhân viên</h1>
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
