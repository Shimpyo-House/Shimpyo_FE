import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/global.css';
import worker from './mocks/browser';
import Router from './Router';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
