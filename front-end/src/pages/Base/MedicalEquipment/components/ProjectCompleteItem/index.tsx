import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
import { images } from 'assets';

function ProjectCompleteItem(props: any) {
  const { data } = props || {};
  const { image_url, name } = data || {};
  const t = useTranslations();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image_url} alt={name} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
}

export default ProjectCompleteItem;
