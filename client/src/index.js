import React from 'react';
import ReactDOM from 'react-dom/client';

import pages from "pages";

import 'styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <pages.AppPage />
  </React.StrictMode>
);