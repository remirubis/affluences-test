import './assets/css/index.scss';

import { ThemeProvider, Preflight } from '@xstyled/styled-components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './context/Auth';
import Router from './Router';
import { theme } from './ui/theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Preflight />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
