import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import RootWrapper from 'wrappers/RootWrapper';
import configs from 'constants/config';
import { AppEnv } from 'constants/enum';
import { NextIntlClientProvider } from 'next-intl';
import vi from 'i18n/locales/vi.json';
import en from 'i18n/locales/en.json';
import { useState } from 'react';

export const history = createBrowserHistory();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000,
      retry: false,
    },
  },
});

const messages: any = { vi, en };

export default function App() {
  const [locale, setLocale] = useState('vi');

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <QueryClientProvider client={queryClient}>
        <HistoryRouter history={history}>
          <React.Suspense fallback={null}>
            <RootWrapper />
          </React.Suspense>
        </HistoryRouter>
        {configs.APP_ENV !== AppEnv.PROD && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
