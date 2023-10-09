import { BrowserRouter as Router, Routes, Route, useBeforeUnload } from 'react-router-dom';

// Pages
import pages from 'pages';

import 'styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<pages.LoginPage />} />       {/* 로그인 페이지 */}
        <Route path="/main" element={<pages.MainPage />} />     {/* 메인 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
