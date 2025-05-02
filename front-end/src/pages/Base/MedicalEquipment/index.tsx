import PageHeader from 'components/Layout/PageHeader';
import styles from './styles.module.scss';
import PageFooter from 'components/Layout/PageFooter';
import { useTranslations } from 'next-intl';
import { images } from 'assets';
import ProductItem from './components/ProductItem';
import {
  investmentData,
  productListMedical,
  projectComplete,
} from 'constants/default-value';
import InvestmentDataItem from './components/InvestmentDataItem';
import ProjectCompleteItem from './components/ProjectCompleteItem';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MedicalEquipment() {
  const t = useTranslations();
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id: any) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <Fragment key={index}>
        <span dangerouslySetInnerHTML={createMarkup(line)} />
        {index < text.split('\n').length - 1 && <br />}
      </Fragment>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBackground}>
        <PageHeader />
        <div className={styles.containerTitleBg}>
          <p className={styles.titleBg}>{t('common.medicalEquipment')}</p>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.introduction}>
          <p className={styles.titleIntroduction}>
            {t('medicalEquipment.historyDevelopment')}
          </p>
          <div className={styles.containerContentIntro}>
            <div className={styles.viewContentIntro}>
              <p className={styles.contentIntroduction}>
                {t('medicalEquipment.contentIntro1')}
              </p>
            </div>
            <div className={styles.viewContentIntro}>
              <p className={styles.contentIntroduction}>
                {t('medicalEquipment.contentIntro2')}
              </p>
            </div>
            <div className={styles.viewContentIntro}>
              <p className={styles.contentIntroduction}>
                {t('medicalEquipment.contentIntro3')}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.viewProduct}>
          <p className={styles.title}>{t('medicalEquipment.productTitle')}</p>
          <img src={images.lineNews} alt="line" className={styles.line} />
          <div className={styles.viewProductList}>
            {productListMedical.map((item) => {
              return <ProductItem data={item} />;
            })}
          </div>
          <button
            onClick={() => navigate('/contact')}
            className={styles.btnContact}
          >
            {t('medicalEquipment.btnContact')}
            <img
              src={images.arrowWhite}
              alt="phoneWhite"
              className={styles.phoneWhite}
            />
          </button>
        </div>

        <div className={styles.viewInvestmentProductionScale}>
          <p className={styles.title}>
            {t('medicalEquipment.investmentProductionScale')}
          </p>
          <img src={images.line} alt="line" className={styles.line} />
          <div className={styles.viewInstruct}>
            <img
              src={images.icTriangle}
              alt="line"
              className={styles.icTriangle}
            />
            <p className={styles.txtInstruct}>
              {t('medicalEquipment.instruct')}
            </p>
          </div>
          <div className={styles.viewInvestmentData}>
            {investmentData.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.itemWrapper}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <InvestmentDataItem key={item.id} data={item} />
                  {hoveredId === item.id && (
                    <div className={styles.popup}>
                      <p className={styles.txtDetail}>
                        {formatText(item.detail)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.viewProjectComplete}>
          <p className={styles.title}>
            {t('medicalEquipment.titleProjectComplete')}
          </p>
          <img src={images.line} alt="line" className={styles.line} />
          <div className={styles.projectCompleteList}>
            {projectComplete.map((item, index) => {
              return (
                <div key={index} className={styles.itemWrapper}>
                  <ProjectCompleteItem data={item} />
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.viewCertificate}>
          <img
            src={images.certificate}
            alt="certificate"
            className={styles.icCertificate}
          />
          <p className={styles.title}>
            {t('medicalEquipment.titleCertificate')}
          </p>

          <div className={styles.certificateList}>
            <img
              src={images.imgCer}
              alt="certificate"
              className={styles.certificate}
            />
            <img
              src={images.imgCer}
              alt="certificate"
              className={styles.certificate}
            />
            <img
              src={images.imgCer}
              alt="certificate"
              className={styles.certificate}
            />
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

export default MedicalEquipment;
