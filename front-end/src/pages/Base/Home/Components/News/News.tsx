import { images } from 'assets';
import { newsData } from 'constants/default-value';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listNewsKey } from 'utils/queryKey';
import { getNewsApi } from 'api/news';
import { useEffect } from 'react';

function News() {
  const t = useTranslations();
  const navigate = useNavigate();

  const { data, isFetching, refetch } = useQuery({
    queryKey: [listNewsKey],
    queryFn: () => getNewsApi(),
  });

  console.log('123', data);

  return (
    <div className={styles.containerNews}>
      <p className={styles.title}>{t('news.title')}</p>
      <img src={images.lineNews} alt="line" className={styles.line} />
      <div className={styles.body}>
        <div className={styles.newsLarge}>
          <img
            src={newsData[0].image}
            alt={newsData[0].title}
            className={styles.newsImage}
          />
          <div className={styles.newsContent}>
            <p className={styles.newsDate}>
              <img src={images.clock} alt="clock" className={styles.icClock} />
              {newsData[0].date}
            </p>
            <h2 className={styles.newsTitle}>{newsData[0].title}</h2>
          </div>
        </div>

        <div className={styles.newsSmallGrid}>
          {newsData.slice(1).map((news) => (
            <div key={news.id} className={styles.newsSmall}>
              <img
                src={news.image}
                alt={news.title}
                className={styles.newsImageSmall}
              />
              <div className={styles.newsContentSmall}>
                <p className={styles.newsDateSmall}>
                  <img
                    src={images.clock}
                    alt="clock"
                    className={styles.icClock}
                  />
                  {news.date}
                </p>
                <h3 className={styles.newsTitleSmall}>{news.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/news')} className={styles.btnViewMore}>
        {t('button.viewMore')}
        <img src={images.arrowRight} alt="line" className={styles.icArrow} />
      </button>
    </div>
  );
}

export default News;
