import PageFooter from 'components/Layout/PageFooter';
import PageHeader from 'components/Layout/PageHeader';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { images } from 'assets';
import { useQuery } from '@tanstack/react-query';
import { detailNewsKey } from 'utils/queryKey';
import { getDetailNewApi } from 'api/news';

function NewsDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // !TODO: Call API Detail News
  const { data: dataDetailNew, refetch } = useQuery([detailNewsKey], () =>
    getDetailNewApi(id)
  );

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
          <p className={styles.titleBack}>{t('news.titleBack')}</p>
        </div>
        <div className={styles.content}>
          <span
            dangerouslySetInnerHTML={{
              __html: dataDetailNew?.content
                ?.replace(/\\"/g, '"')
                ?.replace(/\\n/g, ''),
            }}
          />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

export default NewsDetail;
