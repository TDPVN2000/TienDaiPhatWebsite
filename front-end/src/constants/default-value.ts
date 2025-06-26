import { images } from 'assets';
import { IFilter, ITaskRow } from './interface';

export const MIN_LENGTH_PASSWORD = 6;
export const MAX_LENGTH_PASSWORD = 25;
export const MAX_LENGTH_USERNAME = 50;
export const EXPIRES_COOKIE = 1;

export const defaultFilter: IFilter = {
  pageIndex: 1,
  pageSize: 10,
};
export const taskData: ITaskRow[] = [
  {
    id: 1,
    name: 'task1',
    amount: 1000,
    createdAt: '2023-03-12T23:50:33.526Z',
  },
  {
    id: 2,
    name: 'task2',
    amount: 2000,
    createdAt: '2023-03-12T23:50:33.526Z',
  },
  {
    id: 3,
    name: 'task3',
    amount: 3000,
    createdAt: '2023-03-12T23:50:33.526Z',
  },
];

export const MENU = [
  { label: 'menu.aboutUs', path: '/' },
  {
    label: 'menu.fieldOfOperation',
    path: '/field-action',
    submenu: [
      { label: 'menu.medicalEquipment', path: '/medical-equipment' },
      { label: 'menu.dredgingLandfill', path: '/dredging-landfill' },
      {
        label: 'menu.investmentProduction',
        path: '/investment-production',
      },
      {
        label: 'menu.mineralExploitation',
        path: '/mineral-exploitation',
        isUpdating: true,
      },
      {
        label: 'menu.businessCooperation',
        path: '/business-cooperation',
        isUpdating: true,
      },
    ],
  },
  { label: 'menu.news', path: '/news' },
  { label: 'menu.recruitment', path: '/recruitment' },
  { label: 'menu.contact', path: '/contact' },
];

export const businessSectorDummyData = [
  {
    id: 1,
    thumbnail: images.medical,
    title: 'common.medicalEquipment',
    content: 'businessSectorContent.medicalEquipment',
    path: '/medical-equipment',
    status: true,
  },
  {
    id: 2,
    thumbnail: images.waterway,
    title: 'common.dredgingLandfill',
    content: 'businessSectorContent.dredgingLandfill',
    path: '/dredging-landfill',
    status: true,
  },
  {
    id: 3,
    thumbnail: images.investment,
    title: 'common.investmentProduction',
    content: 'businessSectorContent.investmentProduction',
    path: '/investment-production',
    status: true,
  },
  {
    id: 4,
    thumbnail: images.mineral,
    title: 'common.mineralMining',
    content: 'businessSectorContent.mineralMining',
    status: false,
  },
  {
    id: 5,
    thumbnail: images.trade,
    title: 'common.businessPartnerships',
    content: 'businessSectorContent.businessPartnerships',
    status: false,
  },
];

export const newsDataDummy = [
  {
    id: 1,
    title: 'Những Cơ Hội Nghề Nghiệp Hấp Dẫn Tại Tiến Đại Phát Tháng 12/2024',
    created_at: '2025-05-12T17:00:46.311206',
    image_url:
      'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  },
  {
    id: 2,
    title: 'Xu Hướng Kinh Doanh Nổi Bật Năm 2024: Cơ Hội Cho Các Doanh Nghiệp',
    created_at: '2025-05-12T17:00:46.311206',
    image_url: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
  },
  {
    id: 3,
    title: 'Tiến Đại Phát Đưa Ra Giải Pháp Mới: Tăng Hiệu Quả Cho Doanh Nghiệp',
    created_at: '2025-05-12T17:00:46.311206',
    image_url:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80',
  },
  {
    id: 4,
    title: 'Hoạt Động Team Building 2024: Gắn Kết Đội Ngũ – Vươn Xa Thành Công',
    created_at: '2025-05-12T17:00:46.311206',
    image_url:
      'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 5,
    title: 'Chúc Mừng Nhân Viên Xuất Sắc Tháng 12/2024!',
    created_at: '2025-05-12T17:00:46.311206',
    image_url:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-waterfall-free-image.jpeg?w=600&quality=80',
  },
];

export const benefitsData = [
  {
    title: 'benefitsDataTitle.salaryBonusRegime',
    items: [
      'benefitsDataItem.competitiveSalary',
      'benefitsDataItem.performanceBonus',
      'benefitsDataItem.holidayTetBonuses',
    ],
  },
  {
    title: 'benefitsDataTitle.welfareRegime',
    items: [
      'benefitsDataItem.insuranceAsRegulated',
      'benefitsDataItem.leavePolicy',
    ],
  },
  {
    title: 'benefitsDataTitle.developmentOpportunities',
    items: [
      'benefitsDataItem.professionalTraining',
      'benefitsDataItem.clearCareerPath',
      'benefitsDataItem.professionalLearningEnv',
    ],
  },
  {
    title: 'benefitsDataTitle.otherBenefits',
    items: [
      'benefitsDataItem.lunchAllowance',
      'benefitsDataItem.idealWorkingEnv',
    ],
  },
];

export const JOBSLIST = [
  {
    id: 1,
    position: 'Kiểm toán viên',
    des_position:
      'Kiểm tra, đánh giá báo cáo tài chính, hệ thống kiểm soát nội bộ và tính tuân thủ pháp luật, nhằm đảm bảo thông tin minh bạch và chính xác.',
    address:
      '11/8/1999 đường Hữu Tùng Mậu, Phường Cầu Diễn, Q. Nam Từ Liêm, Hà Nội',
  },
  {
    id: 2,
    position: 'Nhân viên kinh doanh',
    des_position:
      'Tìm kiếm, tư vấn và chốt đơn hàng với khách hàng, duy trì và phát triển mối quan hệ khách hàng, đảm bảo đạt chỉ tiêu doanh số, hỗ trợ sau bán hàng và cập nhật thông tin thị trường.',
    address:
      '11/8/1999 đường Hữu Tùng Mậu, Phường Cầu Diễn, Q. Nam Từ Liêm, Hà Nội',
  },
  {
    id: 3,
    position: 'Kế toán',
    des_position:
      'Quản lý sổ sách, hóa đơn, chứng từ, lập báo cáo tài chính, thu chi, và thuế, đối chiếu số liệu và kiểm tra tính chính xác, hỗ trợ các công việc kế toán khác theo yêu cầu.',
    address:
      '11/8/1999 đường Hữu Tùng Mậu, Phường Cầu Diễn, Q. Nam Từ Liêm, Hà Nội',
  },
  {
    id: 4,
    position: 'Trợ lý giám đốc',
    des_position:
      'Hỗ trợ giám đốc trong công việc hàng ngày, sắp xếp lịch làm việc, họp và công tác, tổng hợp báo cáo và xử lý tài liệu, phối hợp với các bộ phận để thực hiện nhiệm vụ được giao.',
    address:
      '11/8/1999 đường Hữu Tùng Mậu, Phường Cầu Diễn, Q. Nam Từ Liêm, Hà Nội',
  },
];

export const shipData = [
  {
    id: 1,
    label: 'shipDataLabel.ship1',
    image: images.ship668,
    type: 'shipDataType.ship1',
    details: 'shipDataDetail.ship1',
  },
  {
    id: 2,
    label: 'shipDataLabel.ship2',
    image: images.ship68,
    type: 'shipDataType.ship2',
    details: 'shipDataDetail.ship2',
  },
  {
    id: 3,
    label: 'shipDataLabel.ship3',
    image: images.ship86,
    type: 'shipDataType.ship3',
    details: 'shipDataDetail.ship3',
  },
];

export const projectData = [
  {
    id: 1,
    image_url: images.project1,
    name: 'Công trình Cảng chuyên dụng nhà máy thép Hòa Phát tại Dung Quất',
    description: 'Tổng giá trị hợp đồng 115.500.000.000 VNĐ',
  },
  {
    id: 2,
    image_url: images.project2,
    name: 'Dự án Cảng Biển Trung tâm điện lực Duyên Hải tại huyện Duyên Hải, tỉnh Trà Vinh.',
    description: 'Tổng giá trị hợp đồng 110.000.000.000 VND',
  },
  {
    id: 3,
    image_url: images.project3,
    name: 'Dự án Xây dựng khu liên hợp lọc hóa dầu Nghi Sơn tại Thanh Hóa.',
    description: 'Tổng giá trị hợp đồng 40.000.000.000 VNĐ',
  },
];

export const imgSlideDummy = [images.slide1, images.slide2, images.slide3];

export const productListMedical = [
  {
    id: 1,
    image: images.kidneyFilter,
    title: 'productMedical.product1.title',
    func1: 'productMedical.product1.func1',
    func2: 'productMedical.product1.func2',
    func3: 'productMedical.product1.func3',
  },
  {
    id: 2,
    image: images.kidneyFilter,
    title: 'productMedical.product2.title',
    func1: 'productMedical.product2.func1',
    func2: 'productMedical.product2.func2',
    func3: 'productMedical.product2.func3',
  },
];

export const investmentData = [
  {
    id: 1,
    amount: 'investmentDataAmount.info1',
    title: 'investmentDataTitle.info1',
    detail: `investmentDataDetail.info1`,
  },
  {
    id: 2,
    amount: 'investmentDataAmount.info2',
    title: 'investmentDataTitle.info2',
    detail: `investmentDataDetail.info2`,
  },
  {
    id: 3,
    amount: 'investmentDataAmount.info3',
    title: 'investmentDataTitle.info3',
    detail: `investmentDataDetail.info3`,
  },
  {
    id: 4,
    amount: 'investmentDataAmount.info4',
    title: 'investmentDataTitle.info4',
    detail: `investmentDataDetail.info4`,
  },
];

export const projectComplete = [
  {
    id: 1,
    name: 'Bệnh viện K- cơ sở Tân Triều',
    image_url: images.hospitalTanTrieu,
  },
  {
    id: 2,
    name: 'Bệnh viện đa khoa tỉnh Phú Thọ',
    image_url: images.hospitalPhuTho,
  },
  {
    id: 3,
    name: 'Bệnh viện Chỉnh hình và Phục hồi chức năng Đà Nẵng',
    image_url: images.hospitalDaNang,
  },
  {
    id: 4,
    name: 'Cấp 500 giường tại bệnh viện đa khoa tỉnh Hậu Giang',
    image_url: images.hospitalHauGiang,
  },
  {
    id: 5,
    name: 'Bệnh viện đa khoa tỉnh Hải Dương',
    image_url: images.hospitalHaiDuong,
  },
  {
    id: 6,
    name: 'Bệnh viện E Hà Nội',
    image_url: images.hospitalHNe,
  },
];

export const featureNewsData = [
  {
    id: 1,
    title: 'Những Cơ Hội Nghề Nghiệp Hấp Dẫn Tại Tiến Đại Phát Tháng 12/2024',
    date: '12/10/2024',
    image:
      'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  },
  {
    id: 2,
    title: 'Xu Hướng Kinh Doanh Nổi Bật Năm 2024: Cơ Hội Cho Các Doanh Nghiệp',
    date: '12/10/2024',
    image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
  },
  {
    id: 3,
    title: 'Tiến Đại Phát Đưa Ra Giải Pháp Mới: Tăng Hiệu Quả Cho Doanh Nghiệp',
    date: '12/10/2024',
    image:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80',
  },
];

export const tdpNewsData = [
  {
    id: 1,
    title: 'Những Cơ Hội Nghề Nghiệp Hấp Dẫn Tại Tiến Đại Phát Tháng 12/2024',
    date: '12/10/2024',
    image:
      'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  },
  {
    id: 2,
    title: 'Xu Hướng Kinh Doanh Nổi Bật Năm 2024: Cơ Hội Cho Các Doanh Nghiệp',
    date: '12/10/2024',
    image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
  },
  {
    id: 3,
    title: 'Tiến Đại Phát Đưa Ra Giải Pháp Mới: Tăng Hiệu Quả Cho Doanh Nghiệp',
    date: '12/10/2024',
    image:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80',
  },
  {
    id: 4,
    title: 'Những Cơ Hội Nghề Nghiệp Hấp Dẫn Tại Tiến Đại Phát Tháng 12/2024',
    date: '12/10/2024',
    image:
      'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  },
  {
    id: 5,
    title: 'Xu Hướng Kinh Doanh Nổi Bật Năm 2024: Cơ Hội Cho Các Doanh Nghiệp',
    date: '12/10/2024',
    image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
  },
  {
    id: 6,
    title: 'Tiến Đại Phát Đưa Ra Giải Pháp Mới: Tăng Hiệu Quả Cho Doanh Nghiệp',
    date: '12/10/2024',
    image:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80',
  },
  {
    id: 7,
    title: 'Những Cơ Hội Nghề Nghiệp Hấp Dẫn Tại Tiến Đại Phát Tháng 12/2024',
    date: '12/10/2024',
    image:
      'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  },
  {
    id: 8,
    title: 'Xu Hướng Kinh Doanh Nổi Bật Năm 2024: Cơ Hội Cho Các Doanh Nghiệp',
    date: '12/10/2024',
    image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
  },
  {
    id: 9,
    title: 'Tiến Đại Phát Đưa Ra Giải Pháp Mới: Tăng Hiệu Quả Cho Doanh Nghiệp',
    date: '12/10/2024',
    image:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80',
  },
  {
    id: 10,
    title: 'Những Cơ Hội Nghề Nghiệp Hấp Dẫn Tại Tiến Đại Phát Tháng 12/2024',
    date: '12/10/2024',
    image:
      'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  },
  {
    id: 11,
    title: 'Xu Hướng Kinh Doanh Nổi Bật Năm 2024: Cơ Hội Cho Các Doanh Nghiệp',
    date: '12/10/2024',
    image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
  },
  {
    id: 12,
    title: 'Tiến Đại Phát Đưa Ra Giải Pháp Mới: Tăng Hiệu Quả Cho Doanh Nghiệp',
    date: '12/10/2024',
    image:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=600&quality=80',
  },
];

export const certificationList = [
  {
    id: 1,
    image_url: '',
  },
  {
    id: 2,
    image_url: '',
  },
  {
    id: 3,
    image_url: '',
  },
];
