import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
import { images } from 'assets';

function ProjectCompleteItem(props: any) {
  const { data } = props || {};
  const { image, name } = data || {};
  const t = useTranslations();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
}

export default ProjectCompleteItem;
