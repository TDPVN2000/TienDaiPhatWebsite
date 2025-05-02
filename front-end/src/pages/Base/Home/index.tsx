import { images } from 'assets';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import Introduction from './Components/Introduction/Introduction';
import History from './Components/History/History';
import BusinessSector from './Components/BusinessSector/BusinessSector';
import VisionMission from './Components/VisionMission/VisionMission';
import News from './Components/News/News';
import PageHeader from 'components/Layout/PageHeader';
import PageFooter from 'components/Layout/PageFooter';

const slideList = [images.carousel1, images.carousel2, images.carousel3];

export default function Home() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <PageHeader />
      <div className={styles.containerSlide}>
        {slideList?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={styles.imgSlide}
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          />
        ))}
        <div className={styles.indicatorContainer}>
          {slideList.map((_, index) => (
            <div
              key={index}
              className={styles.indicator}
              style={{
                backgroundColor:
                  index === currentIndex ? '#FFFFFFCC' : '#FFFFFF33',
              }}
            />
          ))}
        </div>
      </div>

      <Introduction />
      <History />
      <BusinessSector />
      <VisionMission />
      <News />

      <PageFooter />
    </div>
  );
}
