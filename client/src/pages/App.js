// React Package Module
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import pages from "pages";

import Page from "components/container/Page";

// Styles
import "styles/App.css";

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/*" element={<Page><pages.MainPage /></Page>}/>                            {/** 메인 페이지*/}
          <Route path="/novel-detail" element={<Page><pages.NovDetailPage /></Page>}/>            {/** 소설 상세 정보 페이지*/}
          <Route path="/author-myNovel" element={<Page><pages.AuthorMyNov /></Page>}/>            {/** 작가 권한 내 작품 페이지*/}
          <Route path="/favorite-novel" element={<Page><pages.FavoriteNov /></Page>}/>            {/** 찜한 작품 페이지*/}
        </Routes>
      </Router>
  );
};

export default App;