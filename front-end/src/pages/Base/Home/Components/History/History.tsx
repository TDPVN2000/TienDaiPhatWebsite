import styles from './styles.module.scss';
import { images } from 'assets';
import { useTranslations } from 'next-intl';

function History() {
  const t = useTranslations();

  return (
    <div className={styles.containerHistory}>
      <div className={styles.bgHistory}>
        <h1 className={styles.titleHistory}>{t('history.title')}</h1>
        <img
          src={images.lineYellow}
          alt="line_yellow"
          className={styles.lineYellow}
        />
        <p>{t('history.content1')}</p>
        <p>{t('history.content2')}</p>
        <p>{t('history.content3')}</p>
      </div>
    </div>
  );
}

export default History;
