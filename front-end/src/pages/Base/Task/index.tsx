import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import useFilter from 'utils/hooks/useFilter';
import { taskData } from 'constants/default-value';
import TaskFilter from 'components/PageComponent/Task/TaskFilter';
import TaskTable from 'components/PageComponent/Task/TaskTable';
import CustomPagination from 'components/Table/CustomPagination';

export default function Task() {
  const [t] = useTranslation();

  const { filter, handleSearch, handlePageChange } = useFilter();

  return (
    <div className={styles.task}>
      <div className={styles.header}>
        <div className={styles.title}>{t('nav.task')}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.filterContainer}>
          <div className={styles.filter}>
            <TaskFilter handleSearch={handleSearch} />
          </div>
          <div className={styles.actions}></div>
        </div>
        <div className={styles.table}>
          <TaskTable filter={filter} data={taskData || []} loading={false} />
        </div>
        <div className={styles.pagination}>
          <CustomPagination
            pageIndex={filter.pageIndex}
            pageSize={filter.pageSize}
            total={taskData.length || 0}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
