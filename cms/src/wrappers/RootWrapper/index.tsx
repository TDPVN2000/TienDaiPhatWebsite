import ScrollToTop from "components/ScrollToTop";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "utils/hooks/useAuth";
import AuthWrapper from "wrappers/AuthWrapper";

const Notifications = lazy(() => import("pages/Notifications"));
const Contacts = lazy(() => import("pages/Contact"));
const ContactDetail = lazy(
  () => import("pages/Contact/component/ContactDetail")
);
const Login = lazy(() => import("pages/Login"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const ViewsSetting = lazy(() => import("pages/View"));
const Category = lazy(() => import("pages/MasterData/Category"));
const StaticPage = lazy(() => import("pages/MasterData/StaticPage"));
const VerifyCodeOtp = lazy(
  () => import("pages/Login/components/VerifyCodeOtp")
);
const GetCodeOtp = lazy(() => import("pages/Login/components/GetCodeOtp"));
const NewPassword = lazy(() => import("pages/Login/components/NewPassword"));
const EditTerm = lazy(
  () =>
    import(
      "pages/MasterData/StaticPage/components/ListTerm/components/EditTerm"
    )
);
const EditPolicy = lazy(
  () =>
    import(
      "pages/MasterData/StaticPage/components/ListPolicy/components/EditPolicy"
    )
);
const EditCommerLaw = lazy(
  () =>
    import(
      "pages/MasterData/StaticPage/components/ListLaw/components/EditCommerLaw"
    )
);
const EditFaq = lazy(
  () =>
    import("pages/MasterData/StaticPage/components/ListFaq/components/EditFaq")
);

const LpVideoManager = lazy(() => import("pages/LpVideoManager"));

/* ====== Quản lý tin tức ====== */
const NewsManagement = lazy(() => import("pages/NewsManagement"));
const NewsManagementStore = lazy(() => import("pages/NewsManagementStore"));
const NewsManagementDetail = lazy(() => import("pages/NewsManagementDetail"));

/* ====== Quản lý tuyển dụng ====== */
const RecruitmentManagement = lazy(() => import("pages/RecruitmentManagement"));
const RecruitmentManagementStore = lazy(
  () => import("pages/RecruitmentManagementStore")
);
const RecruitmentManagementDetail = lazy(
  () => import("pages/RecruitmentManagementDetail")
);

/* ====== Các dự án đã hoàn thành ====== */
const ProjectsManagement = lazy(() => import("pages/ProjectsManagement"));
const ProjectsManagementStore = lazy(
  () => import("pages/ProjectsManagementStore")
);
const ProjectsManagementDetail = lazy(
  () => import("pages/ProjectsManagementDetail")
);

/* ====== Quản lý chứng chỉ ====== */
const CertificationManagement = lazy(
  () => import("pages/CertificationManagement")
);
const CertificationManagementStore = lazy(
  () => import("pages/CertificationManagementStore")
);
const CertificationManagementDetail = lazy(
  () => import("pages/CertificationManagementDetail")
);

export default function RootWrapper() {
  const authContext = useAuth();
  return (
    <ScrollToTop>
      <Routes>
        <Route
          path="/login"
          element={
            !authContext?.token ? <Navigate to="/" replace /> : <Login />
          } // check here
        />
        <Route
          path="/forgot-password-verify-code"
          element={<VerifyCodeOtp />}
        />
        <Route path="/forgot-password-get-code" element={<GetCodeOtp />} />
        <Route path="/forgot-password" element={<NewPassword />} />

        <Route path="/" element={<AuthWrapper />}>
          {/* REVENUE */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* STAFF */}
          {/* <Route path="/staffs" element={<Staffs />} /> */}
          {/* <Route path="/staffs/detail/:id" element={<StaffDetail />} /> */}
          {/* USER */}
          {/* <Route path="/users" element={<UserList />} /> */}
          {/* <Route path="/users/detail/:id" element={<UserDetail />} /> */}
          {/* SHIPPER */}
          {/* <Route path="/shippers" element={<ShipperList />} /> */}
          {/* <Route
            path="/shippers/request-shippers"
            element={<ShipperListRequest />}
          /> */}
          {/* <Route path="/shippers/add-shipper" element={<ShipperEdit />} />
          <Route path="/shippers/edit-shipper/:id" element={<ShipperEdit />} />
          <Route
            path="/shippers/detail-shipper/:id"
            element={<ShipperDetail />}
          /> */}
          {/* STORE */}
          {/* <Route path="/stores" element={<Stores />} />
          <Route path="/stores/add-store" element={<StoreEdit />} />
          <Route path="/stores/edit-store/:id" element={<StoreEdit />} />
          <Route path="/stores/detail-store/:id" element={<StoreDetail />} /> */}
          {/* NOTIFICATION */}
          {/* <Route path="/notifications" element={<Notifications />} /> */}
          {/* CONTACT */}
          {/* <Route path="/contacts" element={<Contacts />} /> */}
          {/* <Route path="/contacts/detail/:id" element={<ContactDetail />} /> */}
          {/* VIEW */}
          {/* <Route path="/view-setting" element={<ViewsSetting />} /> */}
          {/* MASTER DATA */}
          {/* <Route path="/master-data/category" element={<Category />} /> */}
          {/* <Route path="/master-data/static-page" element={<StaticPage />} /> */}
          {/* <Route
            path="/master-data/static-page/term-edit/:type"
            element={<EditTerm />}
          /> */}
          {/* <Route
            path="/master-data/static-page/policy-edit/:type"
            element={<EditPolicy />}
          />
          <Route
            path="/master-data/static-page/commercial-law-edit/:type"
            element={<EditCommerLaw />}
          />
          <Route
            path="/master-data/static-page/faq-edit/:type"
            element={<EditFaq />}
          /> */}

          {/* ====== Quản lý tin tức ====== */}
          <Route path="/news-management" element={<NewsManagement />} />
          <Route
            path="/news-management/store" // Create
            element={<NewsManagementStore />}
          />
          <Route
            path="/news-management/store/:id" // Edit
            element={<NewsManagementStore />}
          />
          <Route
            path="/news-management/detail/:id"
            element={<NewsManagementDetail />}
          />

          {/* ====== Quản lý tuyển dụng ====== */}
          <Route
            path="/recruitment-management"
            element={<RecruitmentManagement />}
          />
          <Route
            path="/recruitment-management/store" // Create
            element={<RecruitmentManagementStore />}
          />
          <Route
            path="/recruitment-management/store/:id" // Edit
            element={<RecruitmentManagementStore />}
          />
          <Route
            path="/recruitment-management/detail/:id"
            element={<RecruitmentManagementDetail />}
          />

          {/* ====== Các dự án đã hoàn thành ====== */}
          <Route path="/projects-management" element={<ProjectsManagement />} />
          <Route
            path="/projects-management/store" // Create
            element={<ProjectsManagementStore />}
          />
          <Route
            path="/projects-management/store/:id" // Edit
            element={<ProjectsManagementStore />}
          />
          <Route
            path="/projects-management/detail/:id"
            element={<ProjectsManagementDetail />}
          />

          {/* ====== Quản lý chứng chỉ ====== */}
          <Route
            path="/certification-management"
            element={<CertificationManagement />}
          />
          <Route
            path="/certification-management/store" // Create
            element={<CertificationManagementStore />}
          />
          <Route
            path="/certification-management/store/:id" // Edit
            element={<CertificationManagementStore />}
          />
          <Route
            path="/certification-management/detail/:id"
            element={<CertificationManagementDetail />}
          />

          {/* <Route path="/lp-video-manager" element={<LpVideoManager />} /> */}
        </Route>
        {/* <Route path="access-denied" element={<AccessDenied />} />
      <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </ScrollToTop>
  );
}
