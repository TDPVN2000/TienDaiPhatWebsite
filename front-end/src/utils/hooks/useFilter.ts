import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { IFilter } from 'constants/interface';
import { DebounceTime } from 'constants/enum';
import { defaultFilter } from 'constants/default-value';

export interface IHandleSearch {
  searchKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function useFilter(initialFilter?: IFilter) {
  const [filter, setFilter] = useState<IFilter>(initialFilter ?? defaultFilter);

  const handleFilterChange = (changeValue: IFilter) => {
    setFilter({
      ...filter,
      ...changeValue,
      pageIndex: 1,
    });
  };

  const debounceKeyword = useDebouncedCallback((keyword) => {
    handleFilterChange({ ...filter, keyword });
  }, DebounceTime.DEFAULT);

  const searchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceKeyword(e.target.value);
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setFilter({ ...filter, pageIndex: page, pageSize });
  };
  const resetFilter = () => {
    if (initialFilter) {
      setFilter(initialFilter);
      return;
    }
    setFilter(defaultFilter);
  };

  return {
    filter,
    handleFilterChange,
    handlePageChange,
    resetFilter,
    handleSearch: {
      searchKeyword,
    },
  };
}
