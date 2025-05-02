import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { ResponseStatus } from 'constants/enum';
import { useNavigate } from 'react-router-dom';

export default function AccessDenied() {
  const navigate = useNavigate();
  const [t] = useTranslation();

  return (
    <Result
      status={ResponseStatus.FORBIDDEN}
      title={ResponseStatus.FORBIDDEN}
      subTitle={t('text.accessDeniedPage')}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          {t('button.backHome')}
        </Button>
      }
    />
  );
}
