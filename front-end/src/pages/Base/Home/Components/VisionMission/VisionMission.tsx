import styles from './styles.module.scss';
import { images } from 'assets';
import { useTranslations } from 'next-intl';

function VisionMission() {
  const t = useTranslations();

  return (
    <div className={styles.containerHistory}>
      <div className={styles.containerVisionMission}>
        <img
          src={images.bgVisionMission}
          alt="vision_mission"
          className={styles.bgVisionMission}
        />
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{t('visionMission.title')}</p>
        <img src={images.lineYellow} alt="line" className={styles.line} />
        <p className={styles.content}>{t('visionMission.content')}</p>
      </div>
    </div>
  );
}

export default VisionMission;
