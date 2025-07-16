import {
  convertFilterDefault,
  convertQueryDataObj,
  createQueryString,
} from "utils/helper";
import useQueryParams from "./useQueryParams";
import { IFilter } from "constants/interfaces";

interface IProps {
  defaultFilter?: IFilter;
  convertFilterToValidForm?: any;
}

export default function useGetFilterQuery({
  defaultFilter,
  convertFilterToValidForm,
}: IProps) {
  const { getQueryString, setQueryObject } = useQueryParams();
  const filterDataObj = convertQueryDataObj(getQueryString());
  const filterQueryParams =
    (!!convertFilterToValidForm
      ? convertFilterToValidForm(filterDataObj)
      : convertFilterDefault(filterDataObj)) || defaultFilter;
  if (!filterDataObj && defaultFilter) {
    setQueryObject(createQueryString(defaultFilter));
  }
  return filterQueryParams;
}
