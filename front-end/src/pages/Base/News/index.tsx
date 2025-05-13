import { Pagination } from 'antd';
import { images } from 'assets';
import PageFooter from 'components/Layout/PageFooter';
import PageHeader from 'components/Layout/PageHeader';
import { featureNewsData } from 'constants/default-value';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ItemNews from './components/ItemNews';
import styles from './styles.module.scss';
import { useQuery } from '@tanstack/react-query';
import { listNewsKey } from 'utils/queryKey';
import { getNewsApi } from 'api/news';

const tdpNewsData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `Tin số ${index + 1}`,
  date: '2025-04-15',
  image: 'https://picsum.photos/288/181?random=${Math.random()}',
}));

function News() {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const { data, isFetching, refetch } = useQuery({
    queryKey: [listNewsKey],
    queryFn: () => getNewsApi(),
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const visibleTDPNews = tdpNewsData.slice(startIndex, endIndex);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBackground}>
        <PageHeader />
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{t('news.titleNews')}</p>
        <p className={styles.subTitle}>{t('news.subTitleNews')}</p>
        <img src={images.line} alt="line" className={styles.line} />

        <div className={styles.viewListNews}>
          <div className={styles.viewFeaturedNews}>
            <div className={styles.highlightNewsTag}>TIN NỔI BẬT</div>
            <div className={styles.containerFeatureNews}>
              {featureNewsData.map((news) => (
                <ItemNews key={news.id} data={news} />
              ))}
            </div>
          </div>
          <div className={styles.viewTDPNews}>
            <div className={styles.highlightNewsTag}>TIN TỪ TIẾN ĐẠI PHÁT</div>
            <div className={styles.containerTDPNews}>
              {visibleTDPNews.map((news) => (
                <ItemNews key={news.id} data={news} />
              ))}
            </div>

            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={tdpNewsData.length}
              onChange={handleChange}
              className={styles.pagination}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

export default News;
