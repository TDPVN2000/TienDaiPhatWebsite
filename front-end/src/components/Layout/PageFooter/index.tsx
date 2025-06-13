import React from 'react';
import styles from './styles.module.scss';
import { images } from 'assets';
import { useTranslation } from 'react-i18next';

const PageFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="/" className={styles.logoRow}>
          <img src={images.logo} alt="Logo" className={styles.logoImage} />
        </a>

        <div className={styles.footerGrid}>
          <div className={styles.footerInfo}>
            <h2 className={styles.footerCompany}>{t('common.nameCompany')}</h2>
            <p className={styles.footerAddress}>
              <strong>{t('common.headOfficeLabel')}</strong>{' '}
              {t('common.headOfficeAddress')}
            </p>
            <p className={styles.footerPhone}>
              <img
                src={images.phone}
                alt="Phone"
                className={styles.iconContact}
              />
              ...
            </p>
            <p className={styles.footerEmail}>
              <img
                src={images.mail}
                alt="Email"
                className={styles.iconContact}
              />
              ...
            </p>
            <div className={styles.footerSocials}>
              <span>
                <img
                  src={images.facebook}
                  alt="Facebook"
                  className={styles.logoSocial}
                />
              </span>
              <span>
                <img
                  src={images.google}
                  alt="Google"
                  className={styles.logoSocial}
                />
              </span>
              <span>
                <img
                  src={images.twitter}
                  alt="Twitter"
                  className={styles.logoSocial}
                />
              </span>
              <span>
                <img
                  src={images.youtube}
                  alt="YouTube"
                  className={styles.logoSocial}
                />
              </span>
            </div>
          </div>

          {/* Business Fields */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>{t('menu.fieldOfOperation')}</h3>
            <ul>
              <li>
                <a href="/medical-equipment">{t('menu.medicalEquipment')}</a>
              </li>
              <li>
                <a href="/dredging-landfill">{t('menu.dredgingLandfill')}</a>
              </li>
              <li>
                <a href="/investment-production">
                  {t('menu.investmentProduction')}
                </a>
              </li>
              <li> {t('menu.mineralExploitationTrade')}</li>
              <li> {t('menu.businessCooperation')}</li>
            </ul>
          </div>

          {/* About Us */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>{t('menu.aboutUs')}</h3>
            <ul>
              <li>
                <a href="/contact">{t('common.contact')}</a>
              </li>
              <li>
                <a href="/recruitment">{t('common.recruitment')}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.footerCopyright}>{t('common.copyright')}</div>
      </div>
    </footer>
  );
};

export default PageFooter;
