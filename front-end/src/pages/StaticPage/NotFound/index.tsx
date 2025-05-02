import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { ResponseStatus } from 'constants/enum';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const [t] = useTranslation();

  return (
    <Result
      status={ResponseStatus.NOT_FOUND}
      title={ResponseStatus.NOT_FOUND}
      subTitle={t('text.notFoundPage')}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          {t('button.backHome')}
        </Button>
      }
    />
  );
}
