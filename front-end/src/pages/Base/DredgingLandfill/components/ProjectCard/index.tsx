import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { images } from 'assets';

interface Props {
  image: string;
  title: string;
  contractValue: string;
}

const ProjectCard = (props: Props) => {
  const { image, title, contractValue } = props || {};
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Validate image URL
  const isValidImageUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Reset states when image prop changes
    setImageError(false);
    setImageLoading(true);
  }, [image]);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Use fallback image if URL is invalid or there's an error
  const imageSrc = imageError || !isValidImageUrl(image) ? images.project_1 : image;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {imageLoading && !imageError && (
          <div className={styles.imageLoading}>
            <div className={styles.spinner}></div>
          </div>
        )}
        <img
          src={imageSrc}
          alt="project-image"
          className={`${styles.image} ${imageLoading ? styles.hidden : ''}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
          crossOrigin="anonymous"
        />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.contract}>{contractValue}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
