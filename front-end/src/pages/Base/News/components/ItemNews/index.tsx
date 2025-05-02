import { images } from 'assets';
import styles from './styles.module.scss';

function ItemNews({ data }: any) {
  return (
    <div key={data.id} className={styles.newsSmall}>
      <img
        src={data.image}
        alt={data.title}
        className={styles.newsImageSmall}
      />
      <div className={styles.newsContentSmall}>
        <p className={styles.newsDateSmall}>
          <img src={images.clock} alt="clock" className={styles.icClock} />
          {data.date}
        </p>
        <h3 className={styles.newsTitleSmall}>{data.title}</h3>
      </div>
    </div>
  );
}

export default ItemNews;
