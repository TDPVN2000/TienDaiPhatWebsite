import {
    createSearchParams,
    useNavigate
} from "react-router-dom";

const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname: string, params?: any) =>
    navigate({ pathname, search: `?${createSearchParams(params)}` });
};

export default useNavigateSearch;
