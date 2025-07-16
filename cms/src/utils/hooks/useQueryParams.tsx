import { useSearchParams } from "react-router-dom";

export default function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQuery = (queryKey: string) => {
    return searchParams.get(queryKey);
  };
  const setQuery = (queryKey: string, queryValue: string) => {
    searchParams.set(queryKey, queryValue);
    setSearchParams(searchParams);
  };
  const setQueryObject = (queryParams: string) => {
    setSearchParams(queryParams);
  };
  const getQueryString = () => {
    return searchParams.toString();
  };
  const removeQuery = (queryKeys: string[]) => {
    queryKeys.forEach((queryKey: string) => {
      searchParams.delete(queryKey);
      setSearchParams(searchParams);
    });
  };

  return { getQuery, setQuery, getQueryString, removeQuery, setQueryObject };
}
