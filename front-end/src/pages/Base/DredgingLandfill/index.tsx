import PageHeader from 'components/Layout/PageHeader';
import styles from './styles.module.scss';
import PageFooter from 'components/Layout/PageFooter';
import { useTranslation } from 'react-i18next';
import { images } from 'assets';
import ShipCard from './components/ShipCard';
import {
  imgSlideDummy,
  projectComplete,
  projectData,
  shipData,
} from 'constants/default-value';
import ProjectCard from './components/ProjectCard';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getProjectApi } from 'api/project';
import { useQuery } from '@tanstack/react-query';
import { fieldsKey, listFields, projectKey } from 'utils/queryKey';
import { getDetailFieldsApi, getFieldsApi } from 'api/fields';
import { SubMenu } from 'constants/enum';
import Loading from 'components/Loading';
import bgDredging from 'assets/images/carousel2.svg';

function DredgingLandfill() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const slideRef = useRef<HTMLDivElement>(null);

  const { data: listFieldsData = [] } = useQuery({
    queryKey: [listFields],
    queryFn: () => getFieldsApi(),
  });

  const fieldId = listFieldsData.find(
    (val: any) => val?.id === SubMenu.DREDGING_LANDFILL
  )?.id;

  // !TODO: Call API Fields
  const { data: fields = [], isLoading: isLoadingFields } = useQuery({
    queryKey: [fieldsKey],
    queryFn: () => getDetailFieldsApi(fieldId),
    enabled: !!fieldId,
  });

  // !TODO: Call API Project
  const { data: projectData = [], isLoading: isLoadingProjectData } = useQuery({
    queryKey: [projectKey, i18n],
    queryFn: () => getProjectApi({ language: i18n.language }),
  });

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

  const isLoading = isLoadingFields || isLoadingProjectData;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.headerBackground}
        style={{
          backgroundImage: `url(${fields?.image_url || bgDredging})`,
        }}
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
            src={i18n.language === 'en' ? images.profileEn : images.profile}
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
            {projectData
              .filter((item: any) => item?.field_id === fieldId)
              .map((item: any) => {
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
