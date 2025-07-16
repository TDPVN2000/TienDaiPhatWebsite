import { defaultFilterExample } from "constants/defaultValues";
import { CommonValue, LanguageType } from "constants/enums";
import { IFilter } from "constants/interfaces";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface.d";
import { useState } from "react";
import {
  convertDateToStartEndOfDay,
  convertTimeToUTC,
  createQueryString,
} from "utils/helper";
import useQueryParams from "./useQueryParams";

export default function useFilter(
  defaultFilter?: IFilter,
  isSaveInfoFilter?: boolean
) {
  const [headersRequest, setHeadersRequest] = useState({
    "Accept-Language": LanguageType.JA,
  });
  const [filter, setFilter] = useState<IFilter>(
    defaultFilter ?? defaultFilterExample
  );
  const { setQueryObject } = useQueryParams();

  const handleFilterChange = (changeValue: IFilter = {}) => {
    const newFilter = {
      ...filter,
      ...changeValue,
      page: 1,
    };
    setFilter(newFilter);
    if (isSaveInfoFilter) {
      setQueryObject(createQueryString(newFilter));
    }
  };

  const paramsSearch = (params: {
    [key: string]: string | number | undefined | any[];
  }) => {
    handleFilterChange({ ...params });
  };

  const keywordSearch = (value: string) => {
    handleFilterChange({ keyword: value });
  };

  const titleSearch = (value: string) => {
    handleFilterChange({ title: value });
  };

  const dateSearch = (value: string) => {
    handleFilterChange({ date: value });
  };

  const yearSearch = (value: string) => {
    handleFilterChange({ year: value });
  };

  const createdAtSearch = (date: Moment | null, dateString: string) => {
    handleFilterChange({ createdAt: convertTimeToUTC(date) });
  };
  const rangeDateSearch = (
    dateRange: RangeValue<any> | null,
    formatString: [string, string]
  ) => {
    return handleFilterChange({
      startDate: dateRange?.[0]?.startOf("day")?.toISOString(),
      endDate: dateRange?.[1]?.endOf("day")?.toISOString(),
    });
  };

  const rangeMonthSearch = (
    dateRange: RangeValue<any> | null,
    formatString: [string, string]
  ) => {
    return handleFilterChange({
      start_month: dateRange?.[0]?.startOf("month")?.format("YYYY-MM"),
      end_month: dateRange?.[1]?.endOf("month")?.format("YYYY-MM"),
    });
  };

  const createdAtToStartEndSearch = (date: Moment | null) => {
    handleFilterChange(convertDateToStartEndOfDay(date));
  };

  const statusSearch = (value: any) => {
    handleFilterChange({ status: value });
  };
  const statusWaiting = (value: any) => {
    handleFilterChange({ verify_status: value });
  };
  const humanSearch = (value: any) => {
    handleFilterChange({ type: value });
  };
  const categorySearch = (value: any) => {
    handleFilterChange({ category_id: value });
  };

  const handlePageChange = (page?: number, pageSize?: number) => {
    const newPageIndex = page ? { page } : {};
    const newPageSize = pageSize ? { size: pageSize } : {};
    setFilter({ ...filter, ...newPageIndex, ...newPageSize });
  };

  const resetFilter = () => {
    if (defaultFilter) {
      setFilter({ ...defaultFilter });
    } else {
      setFilter({ ...defaultFilterExample });
    }
  };

  const changeAcceptLanguage = (lng: LanguageType = LanguageType.JA) => {
    setHeadersRequest((prevState: any) => ({
      ...prevState,
      "Accept-Language": lng,
    }));
  };

  const rangeDateYYYYMMDDSearch = (
    dateRange: RangeValue<any> | null,
    formatString: [string, string]
  ) => {
    return handleFilterChange({
      start_date: dateRange?.[0]?.startOf("day")?.format("YYYY-MM-DD"),
      end_date: dateRange?.[1]?.endOf("day")?.format("YYYY-MM-DD"),
    });
  };

  const statusIsPaidSearch = (value: any) => {
    handleFilterChange({ is_paid: value });
  };

  const statusTypeOrderSearch = (value: any) => {
    handleFilterChange({ type: value });
  };

  return {
    filter,
    handleFilterChange,
    handlePageChange,
    resetFilter,
    setFilter,
    headersRequest,
    currentLanguage: headersRequest["Accept-Language"],
    setHeadersRequest,
    changeAcceptLanguage,
    handleSearch: {
      keywordSearch,
      titleSearch,
      createdAtSearch,
      statusSearch,
      humanSearch,
      dateSearch,
      yearSearch,
      rangeDateSearch,
      rangeMonthSearch,
      createdAtToStartEndSearch,
      paramsSearch,
      categorySearch,
      statusWaiting,
      rangeDateYYYYMMDDSearch,
      statusIsPaidSearch,
      statusTypeOrderSearch,
    },
  };
}
