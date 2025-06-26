import PageHeader from 'components/Layout/PageHeader';
import styles from './styles.module.scss';
import PageFooter from 'components/Layout/PageFooter';
import { useTranslation } from 'react-i18next';
import { images } from 'assets';
import { useQuery } from '@tanstack/react-query';
import { fieldsKey, listFields } from 'utils/queryKey';
import { getDetailFieldsApi, getFieldsApi } from 'api/fields';
import { SubMenu } from 'constants/enum';
import Loading from 'components/Loading';
import bgInvestment from 'assets/images/carousel3.svg';

function InvestmentProduction() {
  const { t, i18n } = useTranslation();

  const { data: listFieldsData = [] } = useQuery({
    queryKey: [listFields],
    queryFn: () => getFieldsApi(),
  });

  const fieldId = listFieldsData.find(
    (val: any) => val?.id === SubMenu.INVESTMENT_PRODUCTION
  )?.id;

  // !TODO: Call API Fields
  const { data: fields = [], isLoading: isLoadingFields } = useQuery({
    queryKey: [fieldsKey],
    queryFn: () => getDetailFieldsApi(fieldId),
    enabled: !!fieldId,
  });

  const isLoading = isLoadingFields;

  if (isLoading) {
    return <Loading />;
  }

  const handleCheckImgByLanguage = (lang: any) => {
    if (i18n.language === 'en') {
      return {
        financeMinistry: images.tableFinanceMinistryEn,
        capitalStatistics: images.tableCapitalStatisticsEn,
      };
    }
    return {
      financeMinistry: images.tableFinanceMinistry,
      capitalStatistics: images.tableCapitalStatistics,
    };
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.headerBackground}
        style={{
          backgroundImage: `url(${fields?.image_url || bgInvestment})`,
        }}
      >
        <PageHeader />
        <div className={styles.containerTitleBg}>
          <p className={styles.titleBg}>{t('common.investmentProduction')}</p>
          {/* <p className={styles.titleBg}>{fields?.name}</p> */}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.introduction}>
          <p className={styles.titleIntroduction}>
            {t('common.unlockingPotential')}
          </p>
          <div className={styles.viewContentIntro}>
            <p className={styles.contentIntroduction}>
              {t('investmentProduction.contentIntroduction')}
            </p>
          </div>
        </div>
        <div className={styles.viewProject}>
          <p className={styles.noteProject}>
            {t('investmentProduction.noteProject')}
          </p>
        </div>
        <div className={styles.mainContent}>
          <p className={styles.title}>{t('common.VNAttractiveInvestment')}</p>
          <img src={images.line} alt="line" className={styles.line} />

          <div className={styles.viewContent1}>
            <div className={styles.left}>
              <img
                src={images.imgTest1}
                alt="imgTest1"
                className={styles.imgTest1}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                <p className={styles.content}>
                  {t('investmentProduction.contentTop')}
                </p>
                <img
                  src={images.imgTest2}
                  alt="imgTest2"
                  className={styles.imgTest2}
                />
              </div>
              <div className={styles.bottom}>
                <p className={styles.content}>
                  {t('investmentProduction.contentBottom')}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.viewContent2}>
            <p className={styles.statisticsMinistryFinance}>
              {t('investmentProduction.statisticsMinistryFinance')}
            </p>
            <p className={styles.content1}>
              {t('investmentProduction.content1')}
            </p>
            <img
              src={handleCheckImgByLanguage(i18n.language).financeMinistry}
              alt="tableFinanceMinistry"
              className={styles.tableFinanceMinistry}
            />
            <div className={styles.subContent2}>
              <p className={styles.titleSubContent2}>
                {t('investmentProduction.titleSubContent2')}
              </p>
              <p className={styles.mainSubContent2}>
                {t('investmentProduction.mainSubContent2')}
              </p>
            </div>
          </div>
          <div className={styles.viewContent3}>
            <p className={styles.content2}>
              {t('investmentProduction.content2')}
            </p>
            <img
              src={handleCheckImgByLanguage(i18n.language).capitalStatistics}
              alt="tableCapitalStatistics"
              className={styles.tableCapitalStatistics}
            />
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  );
}

export default InvestmentProduction;
