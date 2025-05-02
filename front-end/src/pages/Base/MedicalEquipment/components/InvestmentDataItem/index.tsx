import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';

function InvestmentDataItem(props: any) {
  const { data, onClick } = props || {};
  const { id, amount, title, detail } = data || {};
  const t = useTranslations();

  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.txtAmount}>{amount}</p>
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default InvestmentDataItem;
