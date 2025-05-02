import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import classNames from 'classnames';
import {
  HomeOutlined,
  SettingOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import useToggleSideNav from 'utils/hooks/useToggleSideNav';

export default function SideNav() {
  const { collapsed } = useToggleSideNav();
  const location = useLocation();
  const [t] = useTranslation();
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState('home');

  const items = useMemo(() => {
    return [
      {
        label: <Link to="/">{t('nav.home')}</Link>,
        key: 'home',
        icon: <HomeOutlined rev={undefined} />,
        url: '/',
        visible: true,
      },
      {
        label: <Link to="/task">{t('nav.task')}</Link>,
        key: 'task',
        icon: <TableOutlined rev={undefined} />,
        url: '/task',
        visible: true,
      },
      {
        label: 'Settings',
        key: 'settings',
        icon: <SettingOutlined rev={undefined} />,
        children: [
          {
            label: <Link to="/settings/setting1">{t('nav.setting1')}</Link>,
            key: 'setting1',
            url: '/settings/setting1',
            visible: true,
          },
        ],
        visible: true,
      },
    ].filter((item) => {
      return !!item.visible;
    });
  }, [t]);

  useEffect(() => {
    if (location.pathname === '/') {
      const firstItemVisible = items.find((item) => {
        return item.visible;
      });
      if (firstItemVisible?.hasOwnProperty('children')) {
        const firstSubItemVisible = firstItemVisible?.children?.find(
          (subItem) => subItem?.visible
        );
        navigate(`${firstSubItemVisible?.url}`, {
          replace: true,
        });
      } else {
        navigate(`${firstItemVisible?.url}`, {
          replace: true,
        });
      }
    }
    items.forEach((item) => {
      if (location.pathname.startsWith(item.url || '###')) {
        setSelectedKey(item.key);
      }
      if (item.children) {
        item.children.forEach((childItem) => {
          if (location.pathname.startsWith(childItem.url || '###')) {
            setSelectedKey(childItem.key);
          }
        });
      }
    });
  }, [location.pathname]);

  return (
    <div
      className={classNames({
        [styles.sideNav]: true,
        [styles.sideNavCollapsed]: collapsed,
      })}
      style={{ width: collapsed ? 80 : 250, transition: 'width 0.3s' }}
    >
      <Link className={styles.logo} to="/">
        {t('common.logo')}
      </Link>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[]}
        items={items}
        inlineCollapsed={collapsed}
      ></Menu>
    </div>
  );
}
