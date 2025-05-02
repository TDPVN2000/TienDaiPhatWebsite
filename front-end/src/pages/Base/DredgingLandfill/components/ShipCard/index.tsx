import { images } from 'assets';
import styles from './styles.module.scss';

interface Props {
  img?: string;
  label?: string;
  type?: string;
  details?: string;
}

const ShipCard = (props: Props) => {
  const { img, label, type, details } = props || {};

  return (
    <div className={styles.shipCard}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={label} className={styles.image} />
        <div className={styles.label}>{label}</div>
        <div className={styles.info}>
          <p className={styles.type}>{type}</p>
          <p className={styles.details}>{details}</p>
        </div>
      </div>
    </div>
  );
};

export default ShipCard;
