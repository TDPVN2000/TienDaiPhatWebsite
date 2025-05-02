import React from 'react';
import ReactDOM from 'react-dom/client';
import viVN from 'antd/lib/locale/vi_VN';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

import App from './App';
import 'i18n/i18n';
import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={viVN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
