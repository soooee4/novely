import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from "redux/store";

import pages from "pages";
import 'styles/index.css';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
       
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React>
        <Suspense fallback={<></>}>
          {/* 로딩 중 보여질 페이지 설정 (설정 안할 시 오류 발생) */}
          <pages.AppPage />
        </Suspense>
      </React>
    </PersistGate>
  </Provider>
);