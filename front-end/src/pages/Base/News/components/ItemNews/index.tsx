import { images } from 'assets';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

function ItemNews({ data }: any) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/news-detail/${id}`);
  };

  return (
    <div
      key={data.id}
      className={styles.newsSmall}
      onClick={() => handleClick(data?.id)}
    >
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
