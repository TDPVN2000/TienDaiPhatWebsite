import { images } from 'assets';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { DateTimeFormat } from 'constants/enum';
import { convertTimeToLocal } from 'utils/helper';

function ItemNews({ data }: any) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/news-detail/${id}`);
  };

  return (
    <div
      key={data?.id}
      className={styles.newsSmall}
      onClick={() => handleClick(data?.id)}
    >
      <img
        src={data?.image_url}
        alt={data?.title}
        className={styles.newsImageSmall}
      />
      <div className={styles.newsContentSmall}>
        <p className={styles.newsDateSmall}>
          <img src={images.clock} alt="clock" className={styles.icClock} />
          {convertTimeToLocal(data?.created_at, DateTimeFormat.DATE)}
        </p>
        <h3 className={styles.newsTitleSmall}>{data?.title}</h3>
      </div>
    </div>
  );
}

export default ItemNews;
