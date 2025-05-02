import { Card, Input, Button, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToLogIn = () => {
    navigate('/login');
  };

  const handleSubmit = (payload: any) => {};

  return (
    <div className={styles.signUp}>
      <Card bordered className={styles.form}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>{t('signUp.title')}</h2>
          </Row>
          <Form.Item
            label={t('formLabel.email')}
            name="email"
            rules={[
              {
                required: true,
                message: t('validate.emailRequired') as string,
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('formLabel.password')}
            name="password"
            rules={[
              {
                required: true,
                message: t('validate.passwordRequired') as string,
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={t('formLabel.confirmPassword')}
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: t('validate.passwordRequired') as string,
              },
            ]}
            dependencies={['password']}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              {t('common.signUp')}
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button
              block
              type="dashed"
              htmlType="button"
              onClick={navigateToLogIn}
            >
              {t('common.login')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
