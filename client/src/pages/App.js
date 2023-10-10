import { BrowserRouter as Router, Routes, Route, useBeforeUnload } from 'react-router-dom';

// Pages
import pages from 'pages';

import 'styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<pages.MainPage />} />     {/* 메인 페이지 */}
        <Route path="/novel-detail" element={<pages.NovDetailPage />} />       {/* 소설 상세 정보 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
