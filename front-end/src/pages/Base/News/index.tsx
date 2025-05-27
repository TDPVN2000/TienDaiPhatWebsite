import { useQuery } from '@tanstack/react-query';
import { Pagination } from 'antd';
import { getNewsApi } from 'api/news';
import { images } from 'assets';
import PageFooter from 'components/Layout/PageFooter';
import PageHeader from 'components/Layout/PageHeader';
import Loading from 'components/Loading';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { listNewsKey } from 'utils/queryKey';
import ItemNews from './components/ItemNews';
import styles from './styles.module.scss';

const tdpNewsData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `Tin số ${index + 1}`,
  created_at: '2025-05-12T17:00:46.311206',
  image_url: 'https://picsum.photos/288/181?random=${Math.random()}',
}));

function News() {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // !TODO: Call API List News
  const { data: tdpNewsData = [], isLoading: isLoadingNewsData } = useQuery({
    queryKey: [listNewsKey],
    queryFn: () => getNewsApi(),
  });

  if (isLoadingNewsData) {
    return <Loading />;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const visibleTDPNews = tdpNewsData.slice(startIndex, endIndex);
  const featuredNews = tdpNewsData.slice(0, 3);

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

        {tdpNewsData.length > 0 ? (
          <div className={styles.viewListNews}>
            <div className={styles.viewFeaturedNews}>
              <div className={styles.highlightNewsTag}>TIN NỔI BẬT</div>
              <div className={styles.containerFeatureNews}>
                {featuredNews.map((news: any) => (
                  <ItemNews key={news?.id} data={news} />
                ))}
              </div>
            </div>
            <div className={styles.viewTDPNews}>
              <div className={styles.highlightNewsTag}>
                TIN TỪ TIẾN ĐẠI PHÁT
              </div>
              <div className={styles.containerTDPNews}>
                {visibleTDPNews.map((news: any) => (
                  <ItemNews key={news?.id} data={news} />
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
        ) : (
          <p className={styles.noData}>{t('news.noData')}</p>
        )}
      </div>
      <PageFooter />
    </div>
  );
}

export default News;
