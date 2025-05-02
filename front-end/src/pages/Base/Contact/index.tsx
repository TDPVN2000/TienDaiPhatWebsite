import PageHeader from 'components/Layout/PageHeader';
import styles from './styles.module.scss';
import PageFooter from 'components/Layout/PageFooter';
import { useTranslations } from 'next-intl';
import { images } from 'assets';

function Contact() {
  const t = useTranslations();

  return (
    <div className={styles.containerContact}>
      <div className={styles.headerBackground}>
        <PageHeader />
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{t('contact.title')}</p>
        <p className={styles.subTitle}>{t('contact.subTitle')}</p>
        <img src={images.line} alt="line" className={styles.line} />
      </div>
      <PageFooter />
    </div>
  );
}

export default Contact;
