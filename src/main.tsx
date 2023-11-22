import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';
import worker from './mocks/browser';
import Router from './Router';
import theme from './style/theme';
import globalStyles from './style/globalStyles';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
);
