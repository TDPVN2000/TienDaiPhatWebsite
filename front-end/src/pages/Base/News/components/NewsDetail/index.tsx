import PageFooter from 'components/Layout/PageFooter';
import PageHeader from 'components/Layout/PageHeader';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';

function NewsDetail() {
  const { id } = useParams();
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <PageHeader isDetail={true} />
      <div className={styles.body}>
        <p className={styles.title}>{t('news.titleNews')}</p>
        <p>{`ID news: ${id}`}</p>
      </div>
      <PageFooter />
    </div>
  );
}

export default NewsDetail;
