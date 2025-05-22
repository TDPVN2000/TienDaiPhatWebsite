import PageHeader from 'components/Layout/PageHeader';
import styles from './styles.module.scss';
import PageFooter from 'components/Layout/PageFooter';
import { useTranslations } from 'next-intl';
import { images } from 'assets';
import { useQuery } from '@tanstack/react-query';
import { fieldsKey } from 'utils/queryKey';
import { getDetailFieldsApi } from 'api/fields';
import { SubMenu } from 'constants/enum';
import Loading from 'components/Loading';

function InvestmentProduction() {
  const t = useTranslations();

  // !TODO: Call API Fields
  const { data: fields = [], isLoading: isLoadingFields } = useQuery({
    queryKey: [fieldsKey],
    queryFn: () => getDetailFieldsApi(8),
    // queryFn: () => getDetailFieldsApi(SubMenu.INVESTMENT_PRODUCTION),
  });

  const isLoading = isLoadingFields;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.headerBackground}
        style={{
          backgroundImage: `url(${fields?.image_url})`,
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
              src={images.tableFinanceMinistry}
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
              src={images.tableCapitalStatistics}
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
