import { useTranslation } from 'react-i18next';
import { Input } from 'antd';

import { IHandleSearch } from 'utils/hooks/useFilter';

interface IProps {
  handleSearch: IHandleSearch;
}

export default function TaskFilter({ handleSearch }: IProps) {
  const [t] = useTranslation();

  return (
    <>
      <Input.Search
        placeholder={t('placeholder.keyword')}
        onChange={handleSearch.searchKeyword}
        className="input-search-custom"
      />
    </>
  );
}
