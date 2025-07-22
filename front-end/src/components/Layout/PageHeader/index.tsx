import { useState, useEffect, useRef } from 'react';
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
  const [language, setLanguage] = useState(() => i18n.language || 'vi');
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSubmenuOpenIndex, setDrawerSubmenuOpenIndex] = useState<
    number | null
  >(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setDrawerSubmenuOpenIndex(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsOpen(false);
    setIsDrawerOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMenuClick = (e: any, hasSubmenu: any) => {
    if (hasSubmenu) {
      e.preventDefault();
    }
  };

  const handleDrawerMenuClick = (index: number, hasSubmenu: boolean) => {
    if (!hasSubmenu) {
      setIsDrawerOpen(false);
      return;
    }
    setDrawerSubmenuOpenIndex(index === drawerSubmenuOpenIndex ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsDrawerOpen(false);
        setDrawerSubmenuOpenIndex(null);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDrawerOpen]);

  return (
    <>
      <header
        className={styles.header}
        style={isDetail ? { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' } : {}}
      >
        <Link to="/" className={styles.logo}>
          <img src={images.logo} alt="Logo" className={styles.logoImage} />
        </Link>

        <nav className={styles.headerNav}>
          <ul>
            {MENU.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={(e) => handleMenuClick(e, item.submenu)}
                  style={{ color: isDetail ? '#36404E' : undefined }}
                >
                  {t(item.label)}
                </Link>
                {item.submenu && (
                  <div className={styles.submenu}>
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={styles.submenuItem}
                        style={{
                          color: subItem.isUpdating ? '#999' : undefined,
                          pointerEvents: subItem.isUpdating ? 'none' : 'auto',
                        }}
                      >
                        {t(subItem.label)}
                      </Link>
                    ))}
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

        <div className={styles.menuIcon} onClick={toggleDrawer}>
          <img
            src={images.drawerMenu}
            alt="menu"
            className={styles.imgDrawerMenu}
          />
        </div>
      </header>

      {isDrawerOpen && (
        <div className={styles.drawer} ref={drawerRef}>
          <ul>
            {MENU.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div
                    className={styles.drawerItem}
                    onClick={() => handleDrawerMenuClick(index, true)}
                  >
                    {t(item.label)}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsDrawerOpen(false)}
                    className={styles.drawerItem}
                  >
                    {t(item.label)}
                  </Link>
                )}
                {item.submenu && drawerSubmenuOpenIndex === index && (
                  <div className={styles.drawerSubmenu}>
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        onClick={() => setIsDrawerOpen(false)}
                        className={styles.drawerSubmenuItem}
                      >
                        {t(subItem.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.drawerLanguage}>
            <div
              className={styles.langToggle}
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={language === 'vi' ? images.vnIcon : images.enIcon}
                alt="lang"
                className={styles.languageImg}
              />
              <span className={styles.languageText}>
                {language === 'vi' ? 'Vietnamese' : 'English'}
              </span>
            </div>
            {isOpen && (
              <div className={styles.langDropdown}>
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
        </div>
      )}
    </>
  );
}
