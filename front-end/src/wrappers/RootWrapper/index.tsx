import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('pages/Base/Home'));
const Task = lazy(() => import('pages/Base/Task'));
const News = lazy(() => import('pages/Base/News'));
const Recruitment = lazy(() => import('pages/Base/Recruitment'));
const Contact = lazy(() => import('pages/Base/Contact'));
const MedicalEquipment = lazy(() => import('pages/Base/MedicalEquipment'));
const DredgingLandfill = lazy(() => import('pages/Base/DredgingLandfill'));
const InvestmentProduction = lazy(
  () => import('pages/Base/InvestmentProduction')
);
const NotFound = lazy(() => import('pages/StaticPage/NotFound'));
const AccessDenied = lazy(() => import('pages/StaticPage/AccessDenied'));
const NewsDetail = lazy(() => import('pages/Base/News/components/NewsDetail'));
const RecruitmentDetail = lazy(
  () => import('pages/Base/Recruitment/Components/RecruitmentDetail')
);

export default function RootWrapper() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news-detail/:id" element={<NewsDetail />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/recruitment-detail/:id" element={<RecruitmentDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/medical-equipment" element={<MedicalEquipment />} />
        <Route path="/dredging-landfill" element={<DredgingLandfill />} />
        <Route
          path="/investment-production"
          element={<InvestmentProduction />}
        />
        <Route path="/task" element={<Task />} />
        <Route path="access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
