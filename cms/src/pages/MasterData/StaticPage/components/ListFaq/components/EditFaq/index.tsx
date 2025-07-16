import { useMutation, useQuery } from "@tanstack/react-query";
import { getDetailFaqApi, updateFaqApi } from "api/masterData";
import CustomNotification from "components/CustomNotification";
import { ButtonType, QueryKey } from "constants/enums";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { handleErrorMessage } from "utils/helper";
import styles from "./styles.module.scss";
import HeaderContent from "components/HeaderContent";
import { objectMasterData } from "utils/const/const";
import { Collapse, Form, Input } from "antd";
import Loading from "components/Loading";
import LabelInput from "components/LabelInput";
import CustomButton from "components/CustomButton";
import classNames from "classnames";
import { IconArrowDownBold } from "assets/icon";
import { Delete } from "components/ActionTable/ActionTable";
import { commonValidate } from "constants/ruleForm";

const { Panel } = Collapse;

export default function EditFaq() {
  const [t] = useTranslation();
  const { type } = useParams();
  const [form] = Form.useForm();

  const dataStatusArrForm = Form.useWatch("data", form);
  const [disableBtnConfirm, setDisableBtnConfirm] = useState<boolean>(true);
  const [statusCollapseArr, setStatusCollapseArr] = useState<Array<any>>([]);

  const titleType = objectMasterData?.find(
    (item: any) => item?.value?.toString() === type
  )?.label;

  const {
    data: dataDetailFaq,
    isLoading: loadingInfoFaq,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.DETAIL_FAQ],
    queryFn: () => getDetailFaqApi(type),
    onSuccess: (data: any) => {
      form.setFieldsValue({ data });
    },
  });

  useEffect(() => {
    if (dataStatusArrForm?.length) {
      const newStatusCollapseArr = new Array(dataStatusArrForm?.length)
        ?.fill("-1")
        ?.map((statusCurrent: any, index: any) => {
          if (typeof statusCollapseArr?.[index] === "number") {
            return statusCollapseArr?.[index];
          }
          return statusCurrent;
        });

      setStatusCollapseArr(newStatusCollapseArr);
    }
  }, [dataStatusArrForm]);

  const handleEditFaq = async (param: any) => {
    await updateFaqApi({ ...param, type });
  };

  const {
    mutate: editFaq,
    isLoading: loadingEditFaq,
    isSuccess,
  } = useMutation(handleEditFaq, {
    onSuccess: () => {
      CustomNotification({
        type: "success",
        message: t("notification.success"),
      });
      setDisableBtnConfirm(true);
      refetch();
    },
    onError: (err: any) => {
      handleErrorMessage(err);
    },
  });

  return (
    <div className={styles.container}>
      {(loadingEditFaq || loadingInfoFaq) && <Loading />}
      <HeaderContent
        title={t(`よくある質問（${titleType})`)}
        hasBack
        buttonAdd={{
          title: t("保存"),
          onClick: () => form.submit(),
          isLoading: loadingEditFaq,
          disabled: disableBtnConfirm,
        }}
      />
      <div className={styles.body}>
        <Form onFinish={editFaq} form={form} name="commerLaw" layout="vertical">
          <div className={styles.viewInput}>
            <Form.List name="data">
              {(faqs, { add, remove }) => (
                <>
                  {faqs?.map((faq: any, indexFaq: any) => {
                    return (
                      <div className="mb-8" key={faq?.key}>
                        <Collapse
                          className={classNames(styles.groupFaq, {
                            [styles.groupFaq__headerCollapse]:
                              statusCollapseArr?.[indexFaq] === "-1",
                          })}
                          onChange={(value: any) => {
                            const statusCollaseCurrent = statusCollapseArr?.map(
                              (status: any, indexStatus: any) => {
                                if (indexStatus === indexFaq) {
                                  return value?.length ? indexFaq : "-1";
                                }
                                return status;
                              }
                            );
                            setStatusCollapseArr(statusCollaseCurrent);
                          }}
                          activeKey={statusCollapseArr?.[indexFaq]}
                          expandIcon={({ isActive }) => {
                            return (
                              <>
                                <IconArrowDownBold
                                  className={classNames(
                                    styles.groupFaq__dropIcon,
                                    {
                                      [styles.rotate__90]: !isActive,
                                    }
                                  )}
                                />
                                <Delete
                                  onDelete={() => {
                                    remove(faq?.name);
                                    setDisableBtnConfirm(false);
                                  }}
                                />
                              </>
                            );
                          }}
                        >
                          <Panel
                            header={
                              statusCollapseArr?.[indexFaq] === "-1" ? (
                                <div>
                                  {dataStatusArrForm?.[indexFaq]?.question}
                                </div>
                              ) : (
                                <LabelInput title={t("内容")} isRequired />
                              )
                            }
                            key={indexFaq}
                          >
                            <Form.Item
                              name={[faq?.name, "question"]}
                              rules={[commonValidate.required]}
                              style={{ width: "100%" }}
                            >
                              <Input
                                className={classNames("input mt-4", [
                                  styles.inputName,
                                ])}
                                placeholder={t("質問内容")}
                                style={{ width: "100%" }}
                                maxLength={1000}
                                onChange={(value: any) =>
                                  setDisableBtnConfirm(false)
                                }
                              />
                            </Form.Item>
                            <LabelInput title={t("回答")} isRequired />
                            <Form.Item
                              name={[faq?.name, "answer"]}
                              rules={[commonValidate.required]}
                              validateFirst
                            >
                              <Input.TextArea
                                maxLength={1000}
                                className="textAreaCustom"
                                placeholder={t("回答内容")}
                                style={{ width: "100%" }}
                                onChange={(value: any) =>
                                  setDisableBtnConfirm(false)
                                }
                              />
                            </Form.Item>
                          </Panel>
                        </Collapse>
                        {indexFaq + 1 === faqs?.length && indexFaq + 1 < 50 && (
                          <CustomButton
                            type={ButtonType.OUTLINE}
                            className={classNames("h-40 mt-8", [
                              styles.btnAddFaq,
                            ])}
                            onClick={(e?: any) => {
                              add(faq?.name);
                              const statusCollaseCurrent = [
                                ...statusCollapseArr,
                                indexFaq + 1,
                              ];
                              setStatusCollapseArr(statusCollaseCurrent);
                            }}
                            title={t("追加")}
                            style={{ width: "100%" }}
                          />
                        )}
                      </div>
                    );
                  })}
                  {faqs?.length === 0 && (
                    <CustomButton
                      type={ButtonType.OUTLINE}
                      className={classNames("h-40 mt-8", [styles.btnAddFaq])}
                      onClick={(e?: any) => {
                        add(-1);
                        setStatusCollapseArr([0]);
                      }}
                      title={t("追加")}
                      style={{ width: "100%" }}
                    />
                  )}
                </>
              )}
            </Form.List>
          </div>
        </Form>
      </div>
    </div>
  );
}
