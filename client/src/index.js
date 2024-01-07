import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import pages from "pages";
import 'styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<></>}>
      {/* 로딩 중 보여질 페이지 설정 (설정 안할 시 오류 발생) */}
      <pages.AppPage />
    </Suspense>
  </React.StrictMode>
);