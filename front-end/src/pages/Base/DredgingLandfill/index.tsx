import PageHeader from 'components/Layout/PageHeader';
import styles from './styles.module.scss';
import PageFooter from 'components/Layout/PageFooter';
import { useTranslations } from 'next-intl';
import { images } from 'assets';
import ShipCard from './components/ShipCard';
import { imgSlideDummy, projectData, shipData } from 'constants/default-value';
import ProjectCard from './components/ProjectCard';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getProjectApi } from 'api/project';
import { useQuery } from '@tanstack/react-query';
import { fieldsKey, projectKey } from 'utils/queryKey';
import { getDetailFieldsApi } from 'api/fields';
import { SubMenu } from 'constants/enum';

function DredgingLandfill() {
  const t = useTranslations();
  const navigate = useNavigate();
  const slideRef = useRef<HTMLDivElement>(null);

  // !TODO: Call API Fields
  // const {
  //   data: fields,
  //   isFetching,
  //   refetch,
  // } = useQuery({
  //   queryKey: [fieldsKey],
  //   queryFn: () => getDetailFieldsApi(SubMenu.DREDGING_LANDFILL),
  // });

  // !TODO: Call API Project
  // const { data: projectData, isFetching, refetch } = useQuery({
  //   queryKey: [projectKey],
  //   queryFn: () => getProjectApi(),
  // });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (slideRef.current) {
        const slideImage = slideRef.current.querySelector(
          `.${styles.slideImage}`
        );

        if (slideImage) {
          const scrollWidth = slideImage.scrollWidth;
          const clientWidth = slideImage.clientWidth;

          if (slideImage.scrollLeft + clientWidth >= scrollWidth) {
            slideImage.scrollTo({
              left: 0,
              behavior: 'smooth',
            });
          } else {
            slideImage.scrollBy({
              left: clientWidth,
              behavior: 'smooth',
            });
          }
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.headerBackground}
        style={
          {
            // backgroundImage: `url(${fields?.image_url})`,
          }
        }
      >
        <PageHeader />
        <div className={styles.containerTitleBg}>
          <p className={styles.titleBg}>{t('common.dredgingLandfill')}</p>
          {/* <p className={styles.titleBg}>{fields?.name}</p> */}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.introduction}>
          <p className={styles.titleIntroduction}>
            {t('dredgingLandfill.introductionToTheField')}
          </p>
          <div className={styles.viewContentIntro}>
            <p className={styles.contentIntroduction}>
              {t('dredgingLandfill.contentIntroduction')}
            </p>
          </div>
        </div>

        <div className={styles.viewDredgerInformation}>
          <p className={styles.title}>
            {t('dredgingLandfill.titleDredgerInformation')}
          </p>
          <img src={images.line} alt="line" className={styles.line} />
          <div className={styles.viewListShip}>
            {shipData.map((item) => {
              return (
                <ShipCard
                  key={item.id}
                  img={item.image}
                  label={item.label}
                  type={item.type}
                  details={item.details}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.profile}>
          <p className={styles.title}>{t('dredgingLandfill.profileTitle')}</p>
          <img src={images.line} alt="line" className={styles.line} />
          <img
            src={images.profile}
            alt="profile-map"
            className={styles.profileMap}
          />
          <button
            onClick={() => navigate('/contact')}
            className={styles.btnContact}
          >
            <img
              src={images.phoneWhite}
              alt="phoneWhite"
              className={styles.phoneWhite}
            />
            {t('dredgingLandfill.btnContact')}
          </button>
        </div>

        <div className={styles.wrapperSlide} ref={slideRef}>
          <div className={styles.slideImage}>
            {imgSlideDummy.map((imgSrc, index) => (
              <div key={index} className={styles.imageWrapper}>
                <img
                  src={imgSrc}
                  alt={`project-${index}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.completedProjects}>
          <p className={styles.title}>
            {t('dredgingLandfill.completedProjects')}
          </p>
          <img src={images.line} alt="line" className={styles.line} />
          <div className={styles.viewListProject}>
            {projectData.map((item) => {
              return (
                <ProjectCard
                  key={item?.id}
                  image={item?.image_url}
                  title={item?.name}
                  contractValue={item?.description}
                />
              );
            })}
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

export default DredgingLandfill;
