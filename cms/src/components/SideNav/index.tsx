import { Menu, Row, Badge } from "antd";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePermissions, useRole } from "utils/hooks/usePermissions";
import useToggleSideNav from "utils/hooks/useToggleSideNav";
import styles from "./styles.module.scss";
import { IconPackage } from "assets/icon";
import { ELocalStorageKey, ROLE_TYPE } from "constants/enums";
import ModalDeleteItem from "components/ModalDeleteItem";
import { useAuth } from "utils/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { infoBadgeKey } from "utils/queryKey";
import { getBadgeSideNav } from "api/auth";

const getVisibleItem = (item: any) => {
  return item.filter((item: any) => {
    return item.visible;
  });
};

export default function SideNav() {
  const location = useLocation();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { collapsed } = useToggleSideNav();
  const [selectedKey, setSelectedKey] = useState("");
  const role = localStorage.getItem(ELocalStorageKey.ROLE_TYPE);
  const permissions = usePermissions();
  const [openModalLogOut, setOpenModalLogOut] = useState<boolean>(false);
  const authContext = useAuth();

  // const {
  //   data: dataBadge,
  //   isFetching,
  //   refetch,
  // } = useQuery({
  //   queryKey: [infoBadgeKey],
  //   queryFn: getBadgeSideNav,
  // });

  const items = useMemo(() => {
    return [
      // {
      //   label: <Link to="/dashboard">{t("nav.dashboard")}</Link>,
      //   key: "dashboard",
      //   url: "/dashboard",
      //   visible: role === ROLE_TYPE.ADMIN,
      //   icon: <IconPackage />,
      // },
      {
        label: (
          <div className={styles.viewBadgeRound}>
            <Link to="/news-management">{t("Quản lý tin tức")}</Link>
          </div>
        ),
        key: "newsManagement",
        url: "/news-management",
        visible: true,
      },
      {
        label: (
          <div className={styles.viewBadgeRound}>
            <Link to="/recruitment-management">{t("Quản lý tuyển dụng")}</Link>
          </div>
        ),
        key: "recruitmentManagement",
        url: "/recruitment-management",
        visible: true,
      },
      {
        label: (
          <div className={styles.viewBadgeRound}>
            <Link to="/projects-management">{t("Quản lý dự án")}</Link>
          </div>
        ),
        key: "projectsManagement",
        url: "/projects-management",
        visible: true,
      },
      {
        label: (
          <div className={styles.viewBadgeRound}>
            <Link to="/certification-management">{t("Quản lý chứng chỉ")}</Link>
          </div>
        ),
        key: "certificationManagement",
        url: "/certification-management",
        visible: true,
      },
      // {
      //   label: <Link to="/staffs">{t("nav.staff")}</Link>,
      //   key: "staffs",
      //   icon: <IconPackage />,
      //   url: "/staffs",
      //   visible: true,
      // },
      // {
      //   label: <Link to="/users">{t("nav.user")}</Link>,
      //   key: "users",
      //   url: "/users",
      //   visible: true,
      //   icon: <IconPackage />,
      // },
      // {
      //   label: (
      //     <div className={styles.viewBadgeRound}>
      //       <Link to="/shippers">{t("nav.shipper")}</Link>
      //       {!!dataBadge?.shipper && (
      //         <Badge
      //           className={classNames([
      //             styles.badgeRound,
      //             { [styles.badgeRoundMore]: dataBadge?.shipper >= 99 },
      //           ])}
      //           count={dataBadge?.shipper}
      //           size="small"
      //         />
      //       )}
      //     </div>
      //   ),
      //   visible: true,
      //   key: "shippers",
      //   url: "/shippers",
      //   icon: <IconPackage />,
      // },
      // {
      //   label: <Link to="/stores">{t("nav.store")}</Link>,
      //   key: "store",
      //   url: "/stores",
      //   visible: true,
      //   icon: <IconPackage />,
      // },
      // {
      //   label: <Link to="/notifications">{t("nav.notifications")}</Link>,
      //   key: "notifications",
      //   icon: <IconPackage />,
      //   url: "/notifications",
      //   visible: true,
      // },
      // {
      //   label: (
      //     <div className={styles.viewBadgeRound}>
      //       <Link to="/contacts">{t("nav.contactUs")}</Link>
      //       {!!dataBadge?.contact && (
      //         <Badge
      //           className={classNames([styles.badgeRound], {
      //             [styles.badgeRoundMore]: dataBadge?.contact >= 99,
      //           })}
      //           count={dataBadge?.contact}
      //           size="small"
      //         />
      //       )}
      //     </div>
      //   ),
      //   key: "contactUs",
      //   icon: <IconPackage />,
      //   url: "/contacts",
      //   visible: true,
      // },
      // {
      //   label: t("nav.lpManagement.title"),
      //   key: "lpManagement",
      //   icon: <IconPackage />,
      //   visible: true,
      //   children: [
      //     {
      //       label: (
      //         <div className={styles.viewBadgeRound}>
      //           <Link to="/notification-management">
      //             {t("nav.lpManagement.notiManager")}
      //           </Link>
      //         </div>
      //       ),
      //       key: "notificationManagement",
      //       url: "/notification-management",
      //     },
      //     {
      //       label: (
      //         <Link to="/lp-video-manager">
      //           {t("nav.lpManagement.videoManager")}
      //         </Link>
      //       ),
      //       key: "videoManager",
      //       url: "/lp-video-manager",
      //     },
      //   ],
      // },
      // {
      //   label: <Link to="/view-setting">{t("nav.view")}</Link>,
      //   key: "view",
      //   url: "/view-setting",
      //   visible: role === ROLE_TYPE.ADMIN,
      //   icon: <IconPackage />,
      // },
      // {
      //   label: t("nav.masterData.title"),
      //   key: "masterData",
      //   icon: <IconPackage />,
      //   visible: true,
      //   children: [
      //     {
      //       label: (
      //         <Link to="/master-data/static-page">
      //           {t("nav.masterData.staticPage")}
      //         </Link>
      //       ),
      //       key: "staticPage",
      //       url: "/master-data/static-page",
      //     },
      //     {
      //       label: (
      //         <Link to="/master-data/category">
      //           {t("nav.masterData.category")}
      //         </Link>
      //       ),
      //       key: "category",
      //       url: "/master-data/category",
      //     },
      //   ],
      // },
    ];
  }, [t, permissions]);

  const onLogOut = (info: any) => {
    authContext?.logout();
  };

  // useEffect(() => {
  //   items.forEach((item) => {
  //     if (location.pathname.startsWith(item.url || "###")) {
  //       setSelectedKey(item.key);
  //     }
  //     if (item.children) {
  //       item.children.forEach((childItem) => {
  //         if (location.pathname.startsWith(childItem.url || "###")) {
  //           setSelectedKey(childItem.key);
  //         }
  //       });
  //     }
  //   });
  // }, [location.pathname]);

  useEffect(() => {
    const matchItem = (items: any[]): string | undefined => {
      for (const item of items) {
        if (item.children) {
          const childMatch = matchItem(item.children);
          if (childMatch) return childMatch;
        }
        if (location.pathname.startsWith(item.url)) {
          return item.key;
        }
      }
    };

    const matchedKey = matchItem(items);
    if (matchedKey) setSelectedKey(matchedKey);
  }, [location.pathname, items]);

  useEffect(() => {
    const firstVisibleRoute: any = items.find((route) => route.visible);
    if (location.pathname === "/" && firstVisibleRoute?.visible) {
      if (firstVisibleRoute?.children) {
        const firstChildrenVisible = firstVisibleRoute?.children?.find(
          (route: any) => route.visible
        );
        navigate(firstChildrenVisible?.url);
      } else {
        navigate(firstVisibleRoute?.url);
      }
    }
  }, [location.pathname, permissions]);

  return (
    <div
      className={classNames({
        [styles.sideNav]: true,
        [styles.sideNavCollapsed]: collapsed,
      })}
      style={{ width: collapsed ? 80 : 250, transition: "width 0.3s" }}
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[]}
        className={styles.menu}
        items={getVisibleItem(items)}
      />
      {/* <div
        className={styles.viewLogout}
        onClick={() => setOpenModalLogOut(true)}
      >
        <IconPackage />
        <div className={styles.titleLogout}>{t("common.logout")}</div>
      </div> */}
      <ModalDeleteItem
        open={openModalLogOut}
        dataItem={{}}
        toggle={() => {
          setOpenModalLogOut(!openModalLogOut);
        }}
        onSubmit={onLogOut}
        title={t("Are you sure you want to log out?")}
      />
    </div>
  );
}
