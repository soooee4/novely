import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { GlobalStyles } from '@mui/system';

import pages from "pages";
import 'styles/index.css';

const theme = createTheme({
  typography: {
    fontFamily: "'Pretendard-Regular', sans-serif",
  },
});

const fontFace = `
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={fontFace} />
      <Suspense fallback={<></>}>
        {/* 로딩 중 보여질 페이지 설정 (설정 안할 시 오류 발생) */}
        <pages.AppPage />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
