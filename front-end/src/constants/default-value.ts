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
    title: 'THIẾT BỊ Y TẾ',
    content:
      'Chuyên sản xuất và cung cấp các thiết bị y tế trong mọi lĩnh vực.',
    path: '/medical-equipment',
    status: true,
  },
  {
    id: 2,
    thumbnail: images.waterway,
    title: 'NẠO VÉT, SAN LẤP',
    content: 'Xây dựng cảng biển nước sâu, san lấp.',
    path: '/dredging-landfill',
    status: true,
  },
  {
    id: 3,
    thumbnail: images.investment,
    title: 'ĐẦU TƯ SẢN XUẤT CÔNG NGHỆ CAO',
    content:
      'Đầu tư vào các dây chuyền sản xuất công nghệ cao, tạo ra những sản phẩm giá trị có tính cách mạng theo xu hướng đổi mới, chuyển đổi số và xanh của thị trường.',
    path: '/investment-production',
    status: true,
  },
  {
    id: 4,
    thumbnail: images.mineral,
    title: 'KHAI THÁC KHOÁNG SẢN VÀ THƯƠNG MẠI',
    content:
      'Khai thác và chế biến khoáng sản, cung cấp nguyên liệu cho các ngành công nghiệp.',
    status: false,
  },
  {
    id: 5,
    thumbnail: images.trade,
    title: 'HỢP TÁC KINH DOANH',
    content:
      'Mở rộng hợp tác kinh doanh và thương mại với các đối tác trong và ngoài nước, tạo nên mạng lưới quan hệ kinh doanh toàn cầu.',
    status: false,
  },
];

export const newsData = [
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
    title: 'Chế độ lương thưởng',
    items: [
      'Mức lương cạnh tranh: Được xây dựng dựa trên năng lực, kinh nghiệm và vị trí công việc, đảm bảo sự công bằng và thu hút nhân tài.',
      'Thưởng hiệu suất: Thưởng theo kết quả công việc và đóng góp thực tế.',
      'Thưởng lễ, Tết: Thực hiện đầy đủ theo quy định của Nhà nước, đảm bảo quyền lợi cho người lao động.',
    ],
  },
  {
    title: 'Chế độ phúc lợi',
    items: [
      'Bảo hiểm theo quy định: Đóng đầy đủ BHXH, BHYT và BHTN theo quy định pháp luật.',
      'Chế độ nghỉ phép: 12 ngày phép năm, nghỉ lễ, Tết theo quy định.',
    ],
  },
  {
    title: 'Cơ hội phát triển',
    items: [
      'Đào tạo chuyên môn: Được tham gia các khóa học nâng cao kỹ năng, kiến thức chuyên môn phù hợp với từng vị trí.',
      'Lộ trình thăng tiến rõ ràng: Được xây dựng trên nền tảng năng lực, thái độ và đóng góp thực tế.',
      'Môi trường học hỏi chuyên nghiệp: Làm việc cùng đội ngũ lãnh đạo giàu kinh nghiệm và đồng nghiệp nhiệt huyết, luôn sẵn sàng chia sẻ và hỗ trợ. Có cơ hội làm việc và công tác với các đơn vị nước ngoài trong các lĩnh vực liên quan đến công nghệ và đổi mới. ',
    ],
  },
  {
    title: 'Các phúc lợi khác',
    items: [
      'Hỗ trợ bữa trưa theo ngày công: Góp phần đảm bảo sức khỏe và hiệu quả công việc.',
      'Không gian làm việc lý tưởng: Thân thiện, cởi mở, khuyến khích sáng tạo và tôn trọng sự khác biệt.',
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
    label: 'TIẾN ĐẠI PHÁT 668',
    image: images.ship668,
    type: 'Tàu nạo vét/ Tàu hút bụng',
    details: 'Cấp VR-SB | Công suất 16000 m3/ giờ',
  },
  {
    id: 2,
    label: 'ĐẠI PHÁT 68',
    image: images.ship68,
    type: 'Tàu Công trình',
    details: 'Cấp VR-SI | Công suất 3720 CV',
  },
  {
    id: 3,
    label: 'TIẾN ĐẠI PHÁT 86',
    image: images.ship86,
    type: 'Tàu nạo vét cỡ lớn',
    details: 'Cấp VR-SI | Công suất 2000 CV',
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
    title: 'Quả lọc thận nhân tạo/ lõi lọc PES/ Low-flux.',
    func1: 'Độ thẩm thấu màng lọc thấp: Các lỗ màng nhỏ hơn.',
    func2:
      'Chủ yếu loại bỏ các phân tử nhỏ như ure thông qua quá trình khuếch tán.',
    func3: 'Thường phù hợp cho bệnh nhân suy thận nhẹ hơn.',
  },
  {
    id: 2,
    image: images.kidneyFilter,
    title: 'Quả lọc thận nhân tạo/ lõi lọc PES/ High-flux.',
    func1: 'Độ thẩm thấu màng lọc cao: Các lỗ màng lớn hơn.',
    func2:
      'Loại bỏ các phân tử nhỏ, lớn và trung bình qua quá trình khuếch tán và đối lưu.',
    func3:
      'Thích hợp cho bệnh nhân suy thận nặng hơn, có thể hưởng lợi từ việc loại bỏ độc tố hiệu quả hơn.',
  },
];

export const investmentData = [
  {
    id: 1,
    amount: '> 1.200 tỷ',
    title: 'tổng mức đầu tư dự kiến',
    detail: `<strong>Giai đoạn 1:</strong> 165,636 tỷ vnđ.\n<strong>Giai đoạn 2:</strong> 100,034 tỷ vnđ.\n<strong>Giai đoạn 3:</strong> 435,000 tỷ vnđ.\n<strong>Giai đoạn 4:</strong> 462,000 tỷ vnđ.\nChưa bao gồm các chi phí phát sinh.`,
  },
  {
    id: 2,
    amount: '> 13.000m²',
    title: 'diện tích nhà máy',
    detail: `Nhà máy được đặt tại: <strong>Thượng Khuông, Bình Giang, Hải Dương</strong>.`,
  },
  {
    id: 3,
    amount: '100%',
    title: 'nhập mới trang thiết bị hiện đại',
    detail: `Nguyên vật liệu Sản xuất <strong>nhập khẩu 100% từ Nhật Bản, Hàn Quốc</strong>, đạt tiêu chuẩn chất lượng Y tế. \nDây chuyền sản xuất/lắp ráp: Hiện đại, tự động hoá được cung cấp bới các đối tác uy tín có tên tuổi trong ngành.`,
  },
  {
    id: 4,
    amount: '> 6 triệu',
    title: 'sản phẩm được sản xuất trong 1 năm',
    detail: `<strong>Mục tiêu:</strong> phát triển và mở rộng sản xuất kinh doanh, cung cấp các loại thiết bị y tế Made in Vietnam trong nước và xuất khẩu ra các thị trường quốc tế.`,
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
