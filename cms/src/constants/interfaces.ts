import { PermissionType, ClientType, CommonStatus } from "./enums";
import type { RcFile as OriRcFile } from "rc-upload/lib/interface";

export interface IFilter {
  pageIndex?: number;
  pageSize?: number;
  page?: number;
  size?: number;
  keyword?: string;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
  published_at?: string;
  status?: string | any;
  date?: string;
  type?: string | number | boolean | any[];
  reporter?: any[];
  targetType?: any[];
  reasonId?: number;
  clientType?: any[];
  subCategoryIds?: any[];
  categoryIds?: number[];
  [key: string]: any;
  memberId?: any;
  order_date_start?: string;
  order_date_end?: string;
  start_month?: string;
  end_month?: string;
}

export interface IProfile {
  email: string;
  permissions: PermissionType[];
}

export interface IDoctor {
  id: number;
  accountType: string;
  statusSubscription: string;
  amountPost: number;
}

export interface IDoctorDetail {
  id: number;
  accountType: string;
  statusSubscription: string;
  detailPost: string;
}

export interface IUserRow {
  id: number;
  createdAt: string;
  amountPost: number;
  amountOffer: number;
}

export interface IUserDetail {
  id: number;
  createdAt: string;
  postDetail: string;
  offerDetail: string;
}

export interface IStoreRow {
  id: number;
  accountType: string;
  statusSubscription: string;
  statusStore: string;
  statusRecruitDoctor: string;
}

export interface IBannerRow {
  id: number;
  value: string;
  createdAt: string;
}

export interface IPoster {
  id: number;
  email: string;
  name?: string;
  profile: {
    firstName?: string;
    lastName?: string;
    avatar: string | null;
    nickname?: string;
    userId?: string;
  };
}

export enum PostType { // field type in api get list posts
  DEFAULT = 1,
  FREE = 2,
}

export interface IReactAndComment {
  countComment: number;
  countReaction: number;
  comment?: any[];
}

export interface ISubCategoryItem {
  subCategory: {
    categoryId: number;
    icon: string;
    id: number;
    order: number;
    parentId: number | null;
    title: string;
  };
  subCategoryId: number;
}
export interface IPostAdminRow {
  id: number;
  content: string;
  member?: IPoster | null;
  doctor?: IPoster | null;
  admin?: IPoster | null;
  category: string;
  userId: number;
  createdAt: string;
  reactAndComment: IReactAndComment;
  images: {
    id: number;
    image: string;
  }[];
  address?: any[];
  categoryId?: number | null;
  clientType: ClientType;
  subCategories?: ISubCategoryItem[];
  type?: PostType;
  status: CommonStatus;
  deleteType?: ClientType | null;
}

export interface IPostAction {
  visible: boolean;
  currentRow?: IPostAdminRow;
}

export interface IPermission {
  id: number;
  name: string;
  permission: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface IProfileMember {
  id: number;
  email: string;
  status: number;
  profile: Profile;
}

export interface Profile {
  firstName: string;
  lastName: string;
  avatar: string;
  gender: number;
  birthday: string;
  description: any;
}

export interface RcFile extends OriRcFile {
  readonly lastModifiedDate: Date;
}

export type UploadFileStatus =
  | "error"
  | "success"
  | "done"
  | "uploading"
  | "removed";

export interface UploadFile<T = any> {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>["crossOrigin"];
  originFileObj?: RcFile;
  response?: T;
  error?: any;
  linkProps?: any;
  type?: string;
  xhr?: T;
  preview?: string;
}

export interface IStaff {
  id: number;
  email: string;
  status: number;
  first_name: string;
  last_name: string;
  createdAt?: string;
  roleIds?: number[];
  isSuperAdmin?: number;
  phone_number: string;
  gender?: number;
  year?: string;
  month?: string;
  day?: string;
  birthday?: string;
}
export interface IShipper {
  id: number;
  email: string;
  status: number;
  first_name: string;
  last_name: string;
  createdAt?: string;
  roleIds?: number[];
  isSuperAdmin?: number;
  phone_number: string;
  gender?: number;
  year?: string;
  month?: string;
  day?: string;
  birthday?: string;
}

export interface IStore {
  id: number;
  email: string;
  status: number;
  first_name: string;
  last_name: string;
  createdAt?: string;
  roleIds?: number[];
  isSuperAdmin?: number;
  phone_number: string;
  gender?: number;
  year?: string;
  month?: string;
  day?: string;
  birthday?: string;
}

export interface INotification {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  type: Array<number>;
  is_draft: boolean;
  published_at: string;
  deleted_at: string;
  is_now: boolean;
}

export interface IContact {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  email: string;
  status: boolean;
  published_at: string;
}

export interface IUser {
  id: number;
  email: string;
  status: number;
  first_name: string;
  last_name: string;
  customer_name: string;
  customer_name_kana: string;
  createdAt?: string;
  roleIds?: number[];
  isSuperAdmin?: number;
  phone_number: string;
  gender?: number;
  year?: string;
  month?: string;
  day?: string;
  birthday?: string;
}

export interface IViewInfo {
  id: number;
  category_id: number;
  status: number;
  date_apply: any;
  new_price: string;
  current_price: string;
  time_count: number;
  created_at: string;
  updated_at: string;
  store_category: {
    id: number;
    category_name: string;
  };
}

export interface IReceiverNotification {
  id: number;
  email: string;
  name: string;
}

export interface TypeTerm {
  id?: number;
  type?: number;
}

export interface IImageItem {
  id: number;
  image: string;
}

export interface IAddressItem {
  countryId: number;
  id: number;
  name: string;
  provinceId: number;
}

export interface IFormatAddressShow {
  initAddress?: any[];
  commaLng?: string;
  spaceLng?: string;
  maxShow?: number;
  provinces?: any[];
  countries?: any[];
}

export interface ICategory {
  id?: number;
  categoryId?: number;
  category?: {
    id?: number;
    title?: string;
  };
  storeHiringId?: number;
}

export interface IFullTimeAndPartTimeHiring {
  otherConditions?: string;
  salary?: string;
  startDate?: string;
  workingTime?: string;
  yearsOfExperience?: string;
}

export interface IHiringStore {
  storeId?: number;
  categories?: ICategory[];
  images?: [{ id?: number; name?: string }];
  infoFullTime?: IFullTimeAndPartTimeHiring;
  infoPartTime?: IFullTimeAndPartTimeHiring;
  status?: number;
}

export interface ILeaseStore {
  storeId?: number;
  description?: string;
  equipmentDescription?: string;
  hasMakeupEquipment: number;
  hasSurgeryRoom: number;
  hasTreatmentRoom: number;
  images?: [
    {
      id?: number;
      name?: string;
    }
  ];
  status?: number;
}

export interface IState {
  listAll: IViewInfo[];
  hasMore: boolean;
}
