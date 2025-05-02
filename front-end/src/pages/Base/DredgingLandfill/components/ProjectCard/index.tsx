import styles from './styles.module.scss';

interface Props {
  image: string;
  title: string;
  contractValue: string;
}

const ProjectCard = (props: Props) => {
  const { image, title, contractValue } = props || {};
  return (
    <div className={styles.card}>
      <img src={image} alt="project-image" className={styles.image} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.contract}>{contractValue}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
