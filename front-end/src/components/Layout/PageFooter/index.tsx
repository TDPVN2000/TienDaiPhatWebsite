import React from 'react';
import styles from './styles.module.scss';
import { images } from 'assets';

const PageFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="/" className={styles.logoRow}>
          <img src={images.logo} alt="Logo" className={styles.logoImage} />
        </a>

        <div className={styles.footerGrid}>
          <div className={styles.footerInfo}>
            <h2 className={styles.footerCompany}>
              CÔNG TY CỔ PHẦN ĐẦU TƯ TIẾN ĐẠI PHÁT
            </h2>
            <p className={styles.footerAddress}>
              <strong>Trụ sở chính:</strong> 11/18/199 đường Hồ Tùng Mậu, Phường
              Cầu Diễn, Q. Nam Từ Liêm, Hà Nội
            </p>
            <p className={styles.footerPhone}>
              <img
                src={images.phone}
                alt="Phone"
                className={styles.iconContact}
              />
              (84-4) 37870907 0
            </p>
            <p className={styles.footerEmail}>
              <img
                src={images.mail}
                alt="Email"
                className={styles.iconContact}
              />
              tiendaiphat.co@gmail.com
            </p>
            <div className={styles.footerSocials}>
              <span>
                <img
                  src={images.facebook}
                  alt="Facebook"
                  className={styles.logoSocial}
                />
              </span>
              <span>
                <img
                  src={images.google}
                  alt="Google"
                  className={styles.logoSocial}
                />
              </span>
              <span>
                <img
                  src={images.twitter}
                  alt="Twitter"
                  className={styles.logoSocial}
                />
              </span>
              <span>
                <img
                  src={images.youtube}
                  alt="YouTube"
                  className={styles.logoSocial}
                />
              </span>
            </div>
          </div>

          {/* Business Fields */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>LĨNH VỰC HOẠT ĐỘNG</h3>
            <ul>
              <li>
                <a href="/medical-equipment">Thiết bị y tế</a>
              </li>
              <li>
                <a href="/dredging-landfill">Nạo vét, san lấp</a>
              </li>
              <li>
                <a href="/investment-production">
                  Đầu tư sản xuất công nghệ cao
                </a>
              </li>
              <li>Khai thác khoáng sản và thương mại (Đang cập nhật)</li>
              <li>Hợp tác kinh doanh (Đang cập nhật)</li>
            </ul>
          </div>

          {/* About Us */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>VỀ CHÚNG TÔI</h3>
            <ul>
              <li>
                <a href="/contact"> Liên hệ</a>
              </li>
              <li>
                <a href="/recruitment">Tuyển dụng</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.footerCopyright}>
          ©2024 Bản quyền thuộc Tiến Đại Phát
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
