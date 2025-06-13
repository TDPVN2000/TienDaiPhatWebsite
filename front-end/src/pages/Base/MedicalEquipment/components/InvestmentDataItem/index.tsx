import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

function InvestmentDataItem(props: any) {
  const { data, onClick } = props || {};
  const { id, amount, title, detail } = data || {};
  const { t } = useTranslation();

  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.txtAmount}>{t(amount)}</p>
      <p className={styles.title}>{t(title)}</p>
    </div>
  );
}

export default InvestmentDataItem;
