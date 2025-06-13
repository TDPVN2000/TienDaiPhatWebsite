import { images } from 'assets';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  img?: string;
  label?: string;
  type?: string;
  details?: string;
}

const ShipCard = (props: Props) => {
  const { img, label = '', type = '', details = '' } = props || {};
  const { t } = useTranslation();

  return (
    <div className={styles.shipCard}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={label} className={styles.image} />
        <div className={styles.label}>{t(label)}</div>
        <div className={styles.info}>
          <p className={styles.type}>{t(type)}</p>
          <p className={styles.details}>{t(details)}</p>
        </div>
      </div>
    </div>
  );
};

export default ShipCard;
