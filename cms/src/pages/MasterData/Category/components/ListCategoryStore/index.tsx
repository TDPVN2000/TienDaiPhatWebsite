import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { handleErrorMessage } from "utils/helper";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import useFilter from "utils/hooks/useFilter";
import { listMasterCateStoreKey } from "utils/queryKey";
import { getMasterCateStoreApi, reorderCateStoreApi } from "api/masterData";
import { useInView } from "react-intersection-observer";
import { TypeTabCategory } from "constants/enums";
import InputSearch from "components/SearchHelper/InputSearch";
import DraggableListCateStore from "./components/DraggableListCateStore";
import CustomNotification from "components/CustomNotification";

const DEFAULT_TAKE = 10;

interface IProps {
  onRefetch?: () => void;
  typeTab?: any;
}

export default function ListCategoryStore({ onRefetch, typeTab = "" }: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const [categoriesArr, setCategoriesArr] = useState([]);

  const isTabCateStore =
    typeTab?.toString() === TypeTabCategory.STORE.toString();

  const { filter, handleSearch } = useFilter({
    page: 1,
    size: 10,
  });

  const fetchPostsCateStore = async (params: any) => {
    const data = await getMasterCateStoreApi(params);
    return {
      data: data.records,
      page: data.currentPage,
      total: data.totalRow,
    };
  };

  const {
    data: dataCateStore,
    fetchNextPage: fetchNextPageCateStore,
    refetch: refetchCateStore,
    isFetching: isFetchingCateStore,
  } = useInfiniteQuery(
    [listMasterCateStoreKey, filter],
    ({ pageParam = 1 }) => {
      return fetchPostsCateStore({ ...filter, page: pageParam });
    },
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        return lastPage?.page + 1;
      },
      enabled: isTabCateStore,
    }
  );

  const getDataCategoriesArr = (data: any) => {
    const newDataCate =
      (dataCateStore?.pages || [])?.reduce(
        (a: any, b: any) => a.concat(b.data),
        []
      ) || [];
    return newDataCate?.map((item: any, index: any) => {
      return {
        ...item,
        index: String(index),
      };
    });
  };

  const { mutate: reorderCate, isLoading: loadingReorderCate } = useMutation(
    reorderCateStoreApi,
    {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
      },
      onError: (err: any) => {
        handleErrorMessage(err);
        setCategoriesArr(getDataCategoriesArr(dataCateStore));
      },
    }
  );

  useEffect(() => {
    if (isTabCateStore) {
      if (
        inView &&
        dataCateStore?.pages?.[0]?.total &&
        Number(dataCateStore?.pageParams?.length) * DEFAULT_TAKE <
          Number(dataCateStore?.pages?.[0]?.total)
      ) {
        fetchNextPageCateStore();
      }
    }
  }, [inView, isTabCateStore]);

  useEffect(() => {
    if (dataCateStore) {
      setCategoriesArr(getDataCategoriesArr(dataCateStore));
    }
  }, [dataCateStore]);

  return (
    <div className={styles.container}>
      {(isFetchingCateStore || loadingReorderCate) && <Loading />}
      <div className={styles.body}>
        <div className={styles.viewHeader}>
          <div />
          <div className={styles.viewFilter}>
            <InputSearch
              onSearchKeyword={handleSearch?.keywordSearch}
              placeholder={t("カテゴリーで検索")}
            />
          </div>
        </div>
        <DraggableListCateStore
          categoriesArr={categoriesArr}
          setCategoriesArr={setCategoriesArr}
          onRefetch={refetchCateStore}
          onDragEnd={reorderCate}
        />
        <div ref={ref} style={{ marginBottom: 20 }}></div>
      </div>
    </div>
  );
}
