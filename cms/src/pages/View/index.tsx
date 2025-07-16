import HeaderContent from "components/HeaderContent";
import InputSearch from "components/SearchHelper/InputSearch";
import { useTranslation } from "react-i18next";
import { usePermissions } from "utils/hooks/usePermissions";
import styles from "./styles.module.scss";
import useFilter from "utils/hooks/useFilter";
import { listStaffKey } from "utils/queryKey";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import Loading from "components/Loading";
import { useEffect, useState } from "react";
import { formatYearMonthDay, handleErrorMessage } from "utils/helper";
import CustomNotification from "components/CustomNotification";
import TableView from "./components/TableView";
import { getViewsApi, updateSettingViewApi } from "api/view";
import { Form, Input } from "antd";
import classNames from "classnames";
import { commonValidate } from "constants/ruleForm";
import dayjs from "dayjs";
import { useInView } from "react-intersection-observer";
import { debounce } from "lodash";

const DEFAULT_TAKE = 10;

export default function ViewList() {
  const [t] = useTranslation();
  const permissions = usePermissions();
  const [form] = Form.useForm();
  const dataViewSetting = Form.useWatch("viewSetting", form);
  const { ref, inView } = useInView();
  const [disableBtnConfirm, setDisableBtnConfirm] = useState<boolean>(true);

  const handleChangeTimeCount = (event: any) => {
    const result = event.target.value.replace(/\D/g, "");
    const dataTimeCount = form.getFieldValue("time_count");
    form?.setFieldsValue({ time_count: result });
    if (result === dataTimeCount) {
      setDisableBtnConfirm(false);
    }
  };

  const handleChangeNewPrice = (event?: any, idItem?: number) => {
    const result = event.target.value.replace(/\D/g, "");
    const dataViewSettingForm = form.getFieldValue("viewSetting");
    const newViewSetting = dataViewSettingForm?.map((item: any) => {
      if (item?.id === idItem) {
        return {
          ...item,
          new_price: result,
        };
      } else return item;
    });
    form?.setFieldsValue({ viewSetting: newViewSetting });
    if (
      dataViewSettingForm?.find((item: any) => item?.id === idItem)
        ?.new_price === result
    ) {
      setDisableBtnConfirm(false);
    }
  };

  const fetchPosts = async (params: any) => {
    const data = await getViewsApi(params);
    if (data) {
      const dataViewSettingForm = form.getFieldValue("viewSetting");
      form.setFieldsValue({
        viewSetting: onFormatResult([
          ...(dataViewSettingForm || []),
          ...data?.records,
        ]),
        time_count: data?.timeCount || "",
      });
    }
    return {
      data: data.records,
      page: data.currentPage,
      total: data.totalRow,
    };
  };

  const resetFormCurrent = () => {
    form.setFieldsValue({
      viewSetting: [],
    });
  };

  const onFormatResult = (data: any) => {
    if (data) {
      return data?.map((item: any, index: any) => {
        return {
          ...item,
          new_date: item?.new_date ? dayjs(item?.new_date) : null,
          new_price: item?.new_price !== null ? Number(item?.new_price) : null,
        };
      });
    }
    return [];
  };

  const handleSettingView = async (data: any) => {
    const newDataSettingView = data?.viewSetting?.map(
      (item: any, index: any) => {
        return {
          id: item?.id,
          new_price: item?.new_price === "" ? null : item?.new_price,
          new_date: item?.new_date
            ? formatYearMonthDay(item?.new_date, "YYYY-MM-DD")
            : null,
        };
      }
    );
    const newDataUpdate = {
      time_count: data?.time_count,
      setting_view: newDataSettingView,
    };
    await updateSettingViewApi(newDataUpdate);
  };

  const { filter, handlePageChange, handleSearch } = useFilter({
    page: 1,
    size: 10,
    status: 1,
  });

  const { data, fetchNextPage, refetch, isFetching } = useInfiniteQuery(
    [listStaffKey, filter],
    ({ pageParam = 1 }) => {
      return fetchPosts({ ...filter, page: pageParam });
    },
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        return lastPage?.page + 1;
      },
    }
  );

  const { mutate: settingView, isLoading: loadingSettingView } = useMutation(
    handleSettingView,
    {
      onSuccess: () => {
        CustomNotification({
          type: "success",
          message: t("notification.success"),
        });
        refetch();
        resetFormCurrent();
        setDisableBtnConfirm(true);
      },
      onError: (err: any) => {
        handleErrorMessage(err);
      },
    }
  );

  useEffect(() => {
    if (
      inView &&
      data?.pages?.[0]?.total &&
      Number(data?.pageParams?.length) * DEFAULT_TAKE <
        Number(data?.pages?.[0]?.total)
    ) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={styles.container}>
      {isFetching && <Loading />}
      <HeaderContent
        title={t("view.title")}
        buttonAdd={{
          title: t("common.btnConfirm"),
          onClick: () => form.submit(),
          isLoading: loadingSettingView,
          disabled: disableBtnConfirm,
        }}
      />
      <Form
        onFinish={settingView}
        form={form}
        name="viewList"
        layout="vertical"
      >
        <div className={styles.viewTimeCount}>
          <div className={styles.viewTitleTimeCount}>
            <span className={styles.titleTimeCout}>{t("view.timeCount")}</span>
            <span className={styles.required}>*</span>
          </div>
          <Form.Item
            name={"time_count"}
            rules={[commonValidate.required, commonValidate.price]}
            validateFirst
          >
            <Input
              className={classNames("input w-244 h-48")}
              placeholder={t("view.placeholders.timeCount")}
              allowClear
              onChange={handleChangeTimeCount}
              maxLength={99}
            />
          </Form.Item>
        </div>
        <div className={styles.body}>
          <div className={styles.viewFilter}>
            <div className={styles.viewFilterInput}>
              <InputSearch
                onSearchKeyword={(value: any) => {
                  handleSearch?.keywordSearch(value);
                  resetFormCurrent();
                }}
                placeholder={t("view.placeholderKeyword")}
              />
            </div>
          </div>
          <Form.List name="viewSetting">
            {(fields: any) => {
              return (
                <TableView
                  data={
                    (data?.pages || [])?.reduce(
                      (a: any, b: any) => a.concat(b.data),
                      []
                    ) || []
                  }
                  isLoading={false}
                  onEdit={() => null}
                  filter={filter}
                  onRefetch={refetch}
                  dataForm={dataViewSetting}
                  handleChangeNewPrice={handleChangeNewPrice}
                  setDisableBtnConfirm={setDisableBtnConfirm}
                />
              );
            }}
          </Form.List>
          <div ref={ref} style={{ marginBottom: 10 }}></div>
        </div>
      </Form>
    </div>
  );
}
