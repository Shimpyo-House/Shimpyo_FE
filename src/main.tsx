import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RecoilRoot } from 'recoil';
import worker from './mocks/browser';
import Router from './Router';
import theme from './style/theme';
import globalStyles from './style/globalStyles';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <RecoilRoot>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
   </RecoilRoot>
  </React.StrictMode>,
);
