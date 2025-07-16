import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { handleErrorMessage } from "utils/helper";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import useFilter from "utils/hooks/useFilter";
import { listMasterCateWorkerKey } from "utils/queryKey";
import { getMasterCateWorkerApi, reorderCateWorkerApi } from "api/masterData";
import { useInView } from "react-intersection-observer";
import { TypeTabCategory } from "constants/enums";
import InputSearch from "components/SearchHelper/InputSearch";
import DraggableListCateWorker from "./components/DraggableListCateWorker";
import CustomNotification from "components/CustomNotification";

const DEFAULT_TAKE = 10;

interface IProps {
  onRefetch?: () => void;
  typeTab?: any;
}

export default function ListCategoryWorker({
  onRefetch,
  typeTab = "",
}: IProps) {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const [categoriesArr, setCategoriesArr] = useState([]);

  const isTabCateWorker =
    typeTab?.toString() === TypeTabCategory.WORKER.toString();

  const { filter, handleSearch } = useFilter({
    page: 1,
    size: 10,
  });

  const fetchPostsCateWorker = async (params: any) => {
    const data = await getMasterCateWorkerApi(params);
    return {
      data: data.records,
      page: data.currentPage,
      total: data.totalRow,
    };
  };

  const {
    data: dataCateWorker,
    fetchNextPage: fetchNextPageCateWorker,
    refetch: refetchCateWorker,
    isFetching: isFetchingCateWorker,
  } = useInfiniteQuery(
    [listMasterCateWorkerKey, filter],
    ({ pageParam = 1 }) => {
      return fetchPostsCateWorker({ ...filter, page: pageParam });
    },
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        return lastPage?.page + 1;
      },
      enabled: isTabCateWorker,
    }
  );

  const getDataCategoriesArr = (data: any) => {
    const newDataCate =
      (dataCateWorker?.pages || [])?.reduce(
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

  const { mutate: reorderCate, isLoading: loadingReorderCatee } = useMutation(
    reorderCateWorkerApi,
    {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
      },
      onError: (err: any) => {
        handleErrorMessage(err);
        setCategoriesArr(getDataCategoriesArr(dataCateWorker));
      },
    }
  );

  useEffect(() => {
    if (isTabCateWorker) {
      if (
        inView &&
        dataCateWorker?.pages?.[0]?.total &&
        Number(dataCateWorker?.pageParams?.length) * DEFAULT_TAKE <
          Number(dataCateWorker?.pages?.[0]?.total)
      ) {
        fetchNextPageCateWorker();
      }
    }
  }, [inView, isTabCateWorker]);

  useEffect(() => {
    if (dataCateWorker) {
      const newDataCate =
        (dataCateWorker?.pages || [])?.reduce(
          (a: any, b: any) => a.concat(b.data),
          []
        ) || [];
      setCategoriesArr(
        newDataCate?.map((item: any, index: any) => {
          return {
            ...item,
            index: String(index),
          };
        })
      );
    }
  }, [dataCateWorker]);

  return (
    <div className={styles.container}>
      {(isFetchingCateWorker || loadingReorderCatee) && <Loading />}
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
        <DraggableListCateWorker
          categoriesArr={categoriesArr}
          setCategoriesArr={setCategoriesArr}
          onRefetch={refetchCateWorker}
          onDragEnd={reorderCate}
        />
        <div ref={ref} style={{ marginBottom: 20 }}></div>
      </div>
    </div>
  );
}
