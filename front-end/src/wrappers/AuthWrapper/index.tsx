import { Navigate, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import styles from './styles.module.scss';
import useProfile from 'utils/hooks/useProfile';
import SideNav from 'components/Layout/SideNav';
import PageHeader from 'components/Layout/PageHeader';
import { CookieKey } from 'constants/enum';
import cookie from 'utils/helper/cookie';

export default function AuthWrapper() {
  const isAuthenticated = !!cookie.getItem(CookieKey.TOKEN);
  const { profile } = useProfile(isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!profile) return null;

  return (
    <div className={styles.pageWrapper}>
      <SideNav />
      <div className={styles.mainWrapper}>
        <PageHeader />
        <div className={styles.pageContent}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
