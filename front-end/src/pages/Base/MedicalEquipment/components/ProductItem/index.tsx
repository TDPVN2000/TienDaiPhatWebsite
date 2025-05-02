import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
import { images } from 'assets';

function ProductItem(props: any) {
  const { data } = props || {};
  const { image, title, func1, func2, func3 } = data || {};
  const t = useTranslations();

  return (
    <div className={styles.lowFluxFilter}>
      <div className={styles.imageSection}>
        <img src={image} alt={title} />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.styleLine}></div>
      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <img src={images.osmosis} alt="osmosis" className={styles.icon} />
          <p>{func1}</p>
        </div>
        <div className={styles.infoItem}>
          <img src={images.icReact} alt="react" className={styles.icon} />
          <p>{func2}</p>
        </div>
        <div className={styles.infoItem}>
          <img src={images.patient} alt="patient" className={styles.icon} />
          <p>{func3}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
