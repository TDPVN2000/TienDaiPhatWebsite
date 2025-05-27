import { ClipLoader } from 'react-spinners';
import styles from './styles.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <ClipLoader size={40} color="#26418E" />
    </div>
  );
}
