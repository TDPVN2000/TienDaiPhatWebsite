import {
  CommonStatus,
  HumanType,
  ReceptionTargetType,
  SellType,
  SubMenu,
  TypeTransport,
} from "constants/enums";
import i18n from "i18n/i18n";

export const defaultTake = 10;

export const EXPIRES = 30;

export const TIME_TO_VERIFY_CODE = 120;

export const text = {
  fieldIsRequired: "こちらは必須項目です。",
  twoPasswordDontMatch: "パスワードとパスワード再入力が異なっています。",
  validatePassword:
    "パスワードは8～20桁の半角文字、半角数字の2種類を組み合わせてください。",
  validateFullNameRegex: "名前には特殊文字を含むことはできません。",
  validateWhiteSpace: "こちらは必須項目です。",
};

export const optionsDropdownStatus = [
  { value: CommonStatus.ALL, label: i18n.t("common.all") },
  { value: CommonStatus.ACTIVE, label: i18n.t("common.active") },
  { value: CommonStatus.INACTIVE, label: i18n.t("common.inactive") },
];

export const optionsDropdownStatusWaiting = [
  { value: 0, label: i18n.t("common.all") },
  { value: 1, label: i18n.t("shipper.waiting") },
  { value: 2, label: i18n.t("shipper.cancel") },
];

export const objectMasterData = [
  { value: 1, label: i18n.t("お店") },
  { value: 2, label: i18n.t("ワーカー") },
  { value: 3, label: i18n.t("利用者") },
];

export const optionsDropdownStatusBill = [
  { value: 0, label: i18n.t("common.all") },
  { value: 1, label: i18n.t("common.statusBill.finish") },
  { value: 2, label: i18n.t("common.statusBill.cancel") },
];

export const optionsDropdownHistoryOrder = [
  { value: null, label: i18n.t("common.all") },
  { value: 5, label: i18n.t("キャンセル") }, //reject
  { value: 6, label: i18n.t("取り消し") }, //cancel
  { value: 4, label: i18n.t("完了") }, //finish
];

export const optionsDropdownStatusWorker = [
  { value: 0, label: i18n.t("common.all") },
  { value: 1, label: i18n.t("common.statusWorker.done") },
  { value: 2, label: i18n.t("common.statusWorker.inActivity") },
];

export const optionsDropdownContactStatus = [
  { value: false, label: i18n.t("common.unRep") },
  { value: true, label: i18n.t("common.rep") },
];

export const optionsDropdownRevenueStatus = [
  { value: false, label: i18n.t("common.unPaid") },
  { value: true, label: i18n.t("common.paid") },
];

export const optionsDropdownStatusNoti = [
  { value: null, label: i18n.t("common.all") },
  { value: false, label: i18n.t("common.send") },
  { value: true, label: i18n.t("common.draft") },
];

export const optionsDropdownTypeHuman = [
  { value: HumanType.ALL, label: i18n.t("common.all") },
  { value: HumanType.USER, label: i18n.t("common.user") },
  { value: HumanType.STORE, label: i18n.t("common.store") },
  { value: HumanType.SHIPPER, label: i18n.t("common.worker") },
];

export const optionsCheckboxReceptionTarget = [
  { value: ReceptionTargetType.NOTICE, label: i18n.t("common.notice") },
  { value: ReceptionTargetType.MEDIA, label: i18n.t("common.media") },
  { value: ReceptionTargetType.EVENT, label: i18n.t("common.event") },
];

export const optionsTransportType = [
  {
    value: TypeTransport.WALK,
    label: i18n.t("editShipper.transportType.walk"),
  },
  {
    value: TypeTransport.CYCLE,
    label: i18n.t("editShipper.transportType.cycle"),
  },
  {
    value: TypeTransport.BIKE125,
    label: i18n.t("editShipper.transportType.bike125"),
  },
  {
    value: TypeTransport.BIKE125_UP,
    label: i18n.t("editShipper.transportType.bike125Upto"),
  },
];

export const optionsCheckboxTypeHuman = [
  { value: HumanType.ALL, label: i18n.t("common.all") },
  { value: HumanType.STORE, label: i18n.t("common.store") },
  { value: HumanType.SHIPPER, label: i18n.t("common.worker") },
  { value: HumanType.USER, label: i18n.t("common.user") },
];

export const optionsCheckboxSellTypeStore = [
  { value: SellType.TAKE_OUT, label: i18n.t("editStore.takeOut") },
  { value: SellType.FROM_STORE, label: i18n.t("editStore.fromStore") },
];

export const optionChangePageSize = [
  { value: 10, label: "10 レコード" },
  { value: 20, label: "20 レコード" },
  { value: 50, label: "50 レコード" },
  { value: 100, label: "100 レコード" },
];

export const optionFormatMonth = {
  noneValue: "月",
  hasValue: "M 月",
};

export const titleTimeWorking = [
  "月曜日",
  "火曜日",
  "水曜日",
  "木曜日",
  "金曜日",
  "土曜日",
  "日曜日",
];
export const labels = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const LIMIT_SIZE_IMAGE = 1000000; // byte => 1 MB

export const acceptedImageType = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/heic",
  "image/heif",
];

export const imageExample =
  "https://tdp-delivery-app-dev.s3.ap-northeast-1.amazonaws.com/shipper/51/20240112/b5fd8ca0-fc77-44ad-8539-d8e46f25efc9congdauthangnay.jpg";

export const optionAccountStatistic = {
  shippers_count: "ワーカー",
  stores_count: "お店",
  users_count: "利用者",
};

export const urlExcelStatistic = {
  revenue: "/api/cms/statistic-revenue/export-by-store",
  account: "/api/cms/statistic-account/export-by-year",
};

export const newOptionsDropdownPaymentStatus = [
  { value: null, label: i18n.t("common.all") },
  { value: 0, label: i18n.t("common.unPaid") },
  { value: 1, label: i18n.t("common.paid") },
];

export const newOptionsDropdownTypeOrder = [
  { value: null, label: i18n.t("common.all") },
  { value: 1, label: i18n.t("dropdownTypeOrder.order") },
  { value: 2, label: i18n.t("dropdownTypeOrder.worker") },
  { value: 3, label: i18n.t("dropdownTypeOrder.shipper") },
];

export const optionsCheckboxTypeProject = [
  { value: SubMenu.MEDICAL_EQUIPMENT, label: i18n.t("Thiết bị y tế") },
  { value: SubMenu.DREDGING_LANDFILL, label: i18n.t("Nạo vét, san lấp") },
];
