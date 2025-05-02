import { Card, Input, Button, Form, Row, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { useAuth } from 'utils/helper/authentication';
import { RuleForm } from 'constants/form-rule';
import { CookieKey } from 'constants/enum';
import cookie from 'utils/helper/cookie';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { login, loadingLogin } = useAuth();

  const navigateToSignUp = () => {
    navigate('/sign-up');
  };
  const handleSubmit = (payload: any) => {
    if (!loadingLogin) {
      login(payload);
    }
  };

  // const isAuthenticated = !!cookie.getItem(CookieKey.TOKEN);
  const isAuthenticated = !!cookie.getItem(CookieKey.TOKEN);

  // !TODO: fake login so add !isAuthenticated
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className={styles.login}>
      <Card bordered className={styles.form}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>{t('login.title')}</h2>
          </Row>
          <Form.Item
            label={t('formLabel.email')}
            name="email"
            rules={RuleForm.username()}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input placeholder={t('placeholder.email')} />
          </Form.Item>
          <Form.Item
            label={t('formLabel.password')}
            name="password"
            rules={RuleForm.password()}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input.Password placeholder={t('placeholder.password')} />
          </Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox> {t('formLabel.rememberMe')}</Checkbox>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              {t('common.login').toUpperCase()}
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button
              block
              type="dashed"
              htmlType="button"
              onClick={navigateToSignUp}
            >
              {t('common.signUp').toUpperCase()}
            </Button>
          </Form.Item>
          <div>
            <p>Account: admin / 123456</p>
          </div>
        </Form>
      </Card>
    </div>
  );
}
