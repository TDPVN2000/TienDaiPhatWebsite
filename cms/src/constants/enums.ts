export enum TokenType {
  TOKEN = "token",
  REFRESH_TOKEN = "refreshToken",
}

export enum ErrorCode {
  UNAUTHORIZED = "Unauthorized",
}

export enum ResponseStatus {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
}

export enum DebounceTime {
  DEFAULT = 500,
}

export enum PermissionType {
  DASHBOARD_VIEW = "DASHBOARD_VIEW",
}

export enum UserPermissionType {
  USER_EDIT = 1,
  USER_VIEW = 2,
  USER_BLOCK = 3,
  MEMBER_EDIT = 4,
  MEMBER_VIEW = 5,
  MEMBER_BLOCK = 6,
  DOCTOR_EDIT = 7,
  DOCTOR_VIEW = 8,
  DOCTOR_BLOCK = 9,
  CLINIC_EDIT = 10,
  CLINIC_VIEW = 11,
  CLINIC_BLOCK = 12,
  BEAUTY_INFO_EDIT = 13,
  BEAUTY_INFO_VIEW = 14,
  BEAUTY_INFO_BLOCK = 15,
  COMMUNITY_EDIT = 16,
  COMMUNITY_VIEW = 17,
  COMMUNITY_BLOCK = 18,
  REPORT_EDIT = 19,
  REPORT_VIEW = 20,
  REPORT_BLOCK = 21,
  OFFER_EDIT = 22,
  OFFER_VIEW = 23,
  OFFER_BLOCK = 24,
  SWIPE_EDIT = 25,
  SWIPE_VIEW = 26,
  SWIPE_BLOCK = 27,
  NOTI_EDIT = 28,
  NOTI_VIEW = 29,
  NOTI_BLOCK = 30,
  RANKING_EDIT = 31,
  RANKING_VIEW = 32,
  RANKING_BLOCK = 33,
  REVIEW_EDIT = 34,
  REVIEW_VIEW = 35,
  REVIEW_BLOCK = 36,
  MASTER_DATA_EDIT = 37,
  MASTER_DATA_VIEW = 38,
  MASTER_DATA_BLOCK = 39,
}

export enum FormatTime {
  DATE_TIME = "DD/MM/YYYY HH:mm",
  DATE = "DD/MM/YYYY",
  DATE_REVERSE = "YYYY/MM/DD",
  DATE_JP = "YYYY年MM月DD日",
  DATE_TIME_JP = "YYYY年MM月DD日 HH:mm",
}

export enum LanguageType {
  JA = "ja",
  EN = "en",
  KEY = "cimode",
  VI = "vi",
  KO = "ko",
}

export enum LocalStorageCode {
  I18 = "i18nextLng",
}

export enum QueryKey {
  POST_LIST = "POST_LIST",
  POST_DETAIL = "POST_DETAIL",
  STAFF_LIST = "STAFF_LIST",
  PERMISSION_LIST = "PERMISSION_LIST",
  MEMBER_LIST = "MEMBER_LIST",
  POST_ADMIN_LIST = "POST_ADMIN_LIST",
  POST_ADMIN_DETAIL = "POST_ADMIN_DETAIL",
  MEMBER_FOR_NOTIFICATION = "MEMBER_FOR_NOTIFICATION",
  CLINIC_FOR_NOTIFICATION = "CLINIC_FOR_NOTIFICATION",
  DOCTOR_FOR_NOTIFICATION = "DOCTOR_FOR_NOTIFICATION",
  NOTIFICATION_LIST = "NOTIFICATION_LIST",
  LIST_FAQ_MEMBER = "LIST_FAQ_MEMBER",
  LIST_FAQ_DOCTOR = "LIST_FAQ_DOCTOR",
  LIST_FAQ_CLINIC = "LIST_FAQ_CLINIC",
  NOTIFICATION_DETAIL = "NOTIFICATION_DETAIL",
  USER_LIST = "USER_LIST",
  POST_COMMENTS = "POST_COMMENTS",
  LIST_BANNER_MEMBER = "LIST_BANNER_MEMBER",
  LIST_BANNER_DOCTOR = "LIST_BANNER_DOCTOR",
  LIST_BANNER_CLINIC = "LIST_BANNER_CLINIC",
  LIST_RANKING_DOCTOR = "LIST_RANKING_DOCTOR",
  LIST_RANKING_CATEGORY = "LIST_RANKING_CATEGORY",
  LIST_REPORT_USER = "LIST_REPORT_USER",
  LIST_REPORT_POST = "LIST_REPORT_POST",
  MANAGE_REPORT = "MANAGER_REPORT",
  MANAGE_BANNER = "MANAGER_BANNER",
  MANAGE_TERMS = "MANAGER_TERMS",
  MANAGE_CATEGORY = "MANAGER_CATEGORY",
  LIST_CAMPAIGNS = "LIST_CAMPAIGNS",
  DETAIL_MEMBER = "DETAIL_MEMBER",
  LIST_CLINIC = "LIST_CLINIC",
  LIST_CLINIC_REQUEST = "LIST_CLINIC_REQUEST",
  DETAIL_CLINIC = "DETAIL_CLINIC",
  OFFER_LIST = "OFFER_LIST",
  DOCTORS_LIST = "DOCTORS_LIST",
  DOCTORS_LIST_REQUEST = "DOCTORS_LIST_REQUEST",
  DOCTOR_DETAIL = "DOCTOR_DETAIL",
  DETAIL_OFFER = "DETAIL_OFFER",
  LIST_REVIEW = "LIST_REVIEW",
  DETAIL_REVIEW = "DETAIL_REVIEW",
  SWIPE_LIST = "SWIPE_LIST",
  SWIPE_DETAIL = "SWIPE_DETAIL",
  SWIPE_LIST_OF_DOCTOR = "SWIPE_LIST_OF_DOCTOR",
  REVIEW_LIST_OF_DOCTOR = "REVIEW_LIST_OF_DOCTOR",
  REVIEW_LIST_OF_USER = "REVIEW_LIST_OF_USER",
  MANAGE_POLICY = "MANAGE_POLICY",
  DETAIL_STORE = "DETAIL_STORE",
  LIST_STORE = "LIST_STORE",
  DETAIL_STAFF = "DETAIL_STAFF",
  DETAIL_SHIPPER = "DETAIL_SHIPPER",
  CATEGORIES_SHIPPER = "CATEGORIES_SHIPPER",
  CATEGORIES_STORE = "CATEGORIES_STORE",
  SETTING_VIEW_CATEGORY = "SETTING_VIEW_CATEGORY",
  CATEGORIES_PRODUCT = "CATEGORIES_PRODUCT",
  DETAIL_TERM = "DETAIL_TERM",
  DETAIL_POLICY = "DETAIL_POLICY",
  DETAIL_LAW = "DETAIL_LAW",
  DETAIL_FAQ = "DETAIL_FAQ",
  DETAIL_CONTACT = "DETAIL_CONTACT",
  REPLY_CONTACT = "REPLY_CONTACT",
  DETAIL_NOTIFY = "DETAIL_NOTIFY",
  LIST_NOTIFY = "LIST_NOTIFY",

  // TDP
  LIST_NEWS = "LIST_NEWS",
  LIST_RECRUITMENT = "LIST_RECRUITMENT",
  LIST_PROJECT = "LIST_PROJECT",
  LIST_CERTIFICATION = "LIST_CERTIFICATION",
  DETAIL_NEW = "DETAIL_NEW",
  DETAIL_RECRUITMENT = "DETAIL_RECRUITMENT",
  DETAIL_PROJECT = "DETAIL_PROJECT",
  DETAIL_CERTIFICATION = "DETAIL_CERTIFICATION",
}

export enum PostCommunityStatus {
  ON = "ON",
  OFF = "OFF",
}

export enum ActionType {
  ADD = "ADD",
  UPDATE = "UPDATE",
}

export enum ClientType {
  MEMBER = 1,
  DOCTOR = 2,
  CLINIC = 3,
  ADMIN = 4,
}

export enum CommonStatus {
  ALL = 0,
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum StoreStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  ADMIN_NOT_VERIFY = 2,
  NOT_COMPLETE_REGISTER = 3,
  REJECTED = 4,
}

export enum DoctorStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  NOT_VERIFY = 2, // waiting admin accept account, after accept status will to ACTIVE
  NOT_COMPLETE_REGISTER = 3, // status after register success, need upload document, after upload status will to NOT_VERIFY
  REJECTED = 4,
}

export enum StoreStaffType {
  MANAGER = 1,
  STAFF = 2,
}

export enum NotificationTypeSend {
  USER = 1,
  STORE = 2,
  SHIPPER = 3,
  ALL = 4,
  USER_SELECTED = 5,
}

export enum NotificationTimeSend {
  NOW = 1,
  SETTING = 2,
}

export enum ResourceType {
  DOCTOR_ROLE = 1,
  BANNER_MEMBER = 2,
  BANNER_DOCTOR = 3,
  BANNER_CLINIC = 4,
  CAMPAIGN = 5,
  FAQ_DOCTOR = 6,
  REPORT_REASON = 7,
  FAQ_MEMBER = 8,
  FAQ_CLINIC = 9,
  TERM_OF_USE_MEMBER = 10,
  TERM_OF_USE_DOCTOR = 11,
  TERM_OF_USE_CLINIC = 12,
  CLINIC_STAFF_ROLE = 13,
  // Request
  DOCTOR_REQUEST_RECRUIT = 14,
  DOCTOR_REQUEST_COLLAB = 15,
  DOCTOR_REQUEST_OTHER = 16,
  CLINIC_REQUEST_RECRUIT = 17,
  CLINIC_REQUEST_COLLAB = 18,
  CLINIC_REQUEST_OTHER = 19,
  // Review
  PRICE = 20,
  RECOVERY_TIME = 21,
  //Policy
  POLICY_MEMBER = 23,
  POLICY_DOCTOR = 24,
  POLICY_CLINIC = 25,
}

export enum ReportTargetType {
  DOCTOR = 1,
  CLINIC = 2,
  MEMBER = 3,
  POST = 4,
}

export enum DATA_LEVEL {
  LEVEL_DEFAULT = 1,
  LEVEL_TWO = 2,
  LEVEL_THREE = 3,
  LEVEL_FOUR = 4,
}

export enum CommonValue {
  ALL = -1,
}

export const userTabsKey = {
  DETAIL: "0",
  OFFER: "1",
  REVIEW: "2",
};

export enum COMMON_STATUS {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum DetailRowType {
  STRING = "string",
  STATUS = "status",
}

export enum AmendedBefore {
  YES = 1,
  NO = 0,
}

export enum DoctorLicenseType {
  SUB = 1,
  MAIN = 2,
  OTHERS = 3,
}

export enum OfferImageType {
  BEFORE = 1,
  AFTER = 2,
}

export enum NavigateFromType {
  DOCTOR = "doctor",
  USER = "user",
  OFFER = "offer",
  SWIPE = "swipe",
  REVIEW = "review",
}

export enum StorageType {
  LOCAL_STORAGE = "localStorage",
  SESSION_STORAGE = "sessionStorage",
}

export enum ModeRevenueDate {
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
}

export enum ButtonType {
  DEFAULT = "default",
  OUTLINE = "outline",
  ACTION = "action",
  NONE_ROUND = "noneRound",
  TAB_INACTIVE = "tabInActive",
  TAB_ACTIVE = "tabActive",
}

export enum DurationType {
  ALL = "all",
}

export enum DateOption {
  START_DATE = 1,
  END_DATE = 2,
}

export enum ActionModal {
  CREATE = "create",
  EDIT = "edit",
  VIEW = "view",
}

export enum GenderType {
  MALE = 1,
  FEMALE = 2,
}

export enum ELocalStorageKey {
  USERNAME = "username",
  ROLE_TYPE = "roleType",
}

export enum ESessionlStorageKey {
  TYPE_TAB_SHIPPER_LIST = "typeTabShipperList",
  MAIL_GET_CODE = "mailGetCode",
  CODE_OTP = "CODE_OTP",
}

export enum HumanType {
  ALL = 0,
  STORE = 1,
  SHIPPER = 2,
  USER = 3,
}

export enum ReceptionTargetType {
  NOTICE = 0,
  MEDIA = 1,
  EVENT = 2,
}

export enum SellType {
  TAKE_OUT = 1,
  FROM_STORE = 2,
  ALL = 3,
}

export enum ROLE_TYPE {
  ADMIN = "1",
  STAFF = "2",
}

export enum TypeTabShipper {
  APPROVED = 0,
  WAITING = 1,
}

export enum TypeStatusStore {
  CLOSED = 0,
  OPEN = 1,
}

export enum TypeNpo {
  NONE = 0,
  HAVE = 1,
}

export enum TypeTransport {
  WALK = 1,
  CYCLE = 2,
  BIKE125 = 3,
  BIKE125_UP = 4,
}

export enum TypeStatusShipperWaiting {
  WAITING = 0,
  APPROVED = 1,
  CANCEL = 2,
}

export enum TypeStatusBillShipper {
  ALL = 0,
  SUCCESS = 4,
  FAIL = 7,
}

export enum TypeTabDetailShipper {
  DETAIL = 0,
  SHIPPER = 1,
  WORKER = 2,
}

export enum TypeTabDetailStore {
  DETAIL = 0,
  PRODUCT = 1,
  ORDER = 2,
  VIEW = 3,
}

export enum TypeTabCategory {
  STORE = 0,
  WORKER = 1,
}

export enum TypeTabStaticPage {
  TERM = 0,
  POLICY = 1,
  COMMERCIAL_LAW = 2,
  FAQ = 3,
}

export enum TypeObjectMasterData {
  STORE = 1,
  SHIPPER = 2,
  USER = 3,
}

export enum TypeTabDashboard {
  STAFF = 0,
  REVENUE = 1,
  FEE = 2,
}

export enum SendContactType {
  USER = 1,
  ADMIN = 2,
}

export enum VERIFY_STATUS_STORE {
  WAITING = 0,
  APPROVE = 1,
  REJECT = 2,
}

export enum FEE_TYPE {
  ORDER = 1,
  SHIPPER = 2,
  WORKER = 3,
}

export enum TYPE_ORDER {
  ORDER = 1,
  WORKER = 2,
  SHIPPER = 3,
}

export enum SubMenu {
  MEDICAL_EQUIPMENT = 1,
  DREDGING_LANDFILL = 2,
  INVESTMENT_PRODUCTION = 3,
  MINING = 4,
  BUSINESS_COOPERATION = 5,
}
