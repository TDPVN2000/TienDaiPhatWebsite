import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";

import styles from "./styles.module.scss";
import SideNav from "components/SideNav";
import PageHeader from "components/PageHeader";
import { useAuth } from "utils/hooks/useAuth";

export default function AuthWrapper() {
  const authContext = useAuth();
  if (!!authContext?.token) return <Navigate to="/login" />; // check here
  return (
    <div className={styles.pageWrapper}>
      <PageHeader />
      <div className={styles.viewBody}>
        <SideNav />
        <div className={styles.pageContent}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
