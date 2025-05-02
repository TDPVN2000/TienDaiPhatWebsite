import styles from './styles.module.scss';
import { images } from 'assets';
import { businessSectorDummyData } from 'constants/default-value';
import { useTranslations } from 'next-intl';
import { useNavigate } from 'react-router-dom';

function BusinessSector() {
  const t = useTranslations();
  const navigate = useNavigate();

  return (
    <div className={styles.containerBusinessSector}>
      <p className={styles.title}>{t('businessSector.title')}</p>
      <img src={images.line} alt="line" className={styles.line} />
      <div className={styles.body}>
        {businessSectorDummyData.map((item) => {
          const {
            id,
            thumbnail,
            title,
            content,
            path = '',
            status,
          } = item || {};
          return (
            <div key={id} className={styles.containerItem}>
              <div className={styles.containerThumbnail}>
                <img
                  src={thumbnail}
                  alt={item.title}
                  className={styles.thumbnail}
                />
              </div>
              <div className={styles.containerContent}>
                <div
                  style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
                >
                  <p className={styles.titleItem}>{title}</p>
                  <p className={styles.contentItem}>{content}</p>
                </div>
                <div className={styles.viewBtnLearnMore}>
                  <button
                    onClick={() => navigate(path)}
                    className={styles.btnLearnMore}
                    style={{
                      color: status ? '#26418e' : '#36404E80',
                    }}
                  >
                    {status
                      ? t('businessSector.btnLearnMore')
                      : t('common.updating')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BusinessSector;
