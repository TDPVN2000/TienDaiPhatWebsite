import { useState } from 'react';
import styles from './styles.module.scss';
import { images } from 'assets';
import { MENU } from 'constants/default-value';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  isDetail?: boolean;
}

export default function PageHeader(props: Props) {
  const { isDetail } = props || {};
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (e: any, hasSubmenu: any) => {
    if (hasSubmenu) {
      e.preventDefault();
    }
  };

  return (
    <header
      className={styles.header}
      style={isDetail ? { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' } : {}}
    >
      <a href="/" className={styles.logo}>
        <img src={images.logo} alt="Logo" className={styles.logoImage} />
      </a>
      <nav className={styles.headerNav}>
        <ul>
          {MENU.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                onClick={(e) => handleMenuClick(e, item.submenu)}
                style={{
                  color: isDetail ? '#36404E' : undefined,
                }}
              >
                {t(item.label)}
              </a>
              {item.submenu && (
                <div className={styles.submenu}>
                  {item.submenu.map((subItem, subIndex) => {
                    return (
                      <a
                        key={subIndex}
                        href={subItem.path}
                        className={styles.submenuItem}
                        style={{
                          color: subItem.isUpdating ? '#999' : undefined,
                          pointerEvents: subItem.isUpdating ? 'none' : 'auto',
                        }}
                      >
                        {t(subItem.label)}
                      </a>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.language} onClick={toggleDropdown}>
        <img
          src={language === 'vi' ? images.vnIcon : images.enIcon}
          alt={language === 'vi' ? 'vn_language' : 'en_language'}
          className={styles.languageImg}
        />
        {isOpen && (
          <div className={styles.dropdown}>
            <div
              onClick={() => handleLanguageChange('vi')}
              className={styles.dropdownItem}
            >
              <img
                src={images.vnIcon}
                alt="vn_language"
                className={styles.languageImg}
              />
              <p className={styles.txtLanguage}>Vietnamese</p>
            </div>
            <div
              onClick={() => handleLanguageChange('en')}
              className={styles.dropdownItem}
            >
              <img
                src={images.enIcon}
                alt="en_language"
                className={styles.languageImg}
              />
              <p className={styles.txtLanguage}>English</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
