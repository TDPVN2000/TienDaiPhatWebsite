export interface IFilter {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
}

export interface ITaskRow {
  id: number;
  name: string;
  amount: number;
  createdAt: string;
}
