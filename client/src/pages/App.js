// React Package Module
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useBeforeUnload } from 'react-router-dom';

// Pages
import pages from 'pages';

import Header from 'components/layout/Header';

import 'styles/App.css';
import Test from "./Test";


const App = () => {
  
  const [profile, setProfile] = useState(localStorage.getItem("profile"));
  console.log(profile,123798)
  
  const logout = () => {
    localStorage.removeItem("profile");
    window.location.reload();
  };


  return (
  	<>
		<Header 
      // profile={profile}
      profile={JSON.parse(profile)}
      setProfile={setProfile}
      logout={logout}
    /> 
		<Router> 
			<Routes>
				<Route path="/*" element={<pages.MainPage />} />     {/* 메인 페이지 */}
				<Route path="/novel-detail" element={<pages.NovDetailPage />} />       {/* 소설 상세 정보 페이지 */}
			</Routes>
		</Router>
	</>
  );
}

export default App;



























// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Pages
// import pages from "pages";

// import Header from "components/layout/Header";

// import "styles/App.css";

// const App = () => {
// 	const [isLogin, setIsLogin] = useState(localStorage.getItem("id") ? true : false);
// 	const [userRegDv, setUserRegDv] = useState(localStorage.getItem("user_reg_dv") ? localStorage.getItem("user_reg_dv") : null);

// 	return (
// 		<>
// 			<Header isLogin={isLogin} userRegDv={userRegDv} />
// 			<Router>
// 				<Routes>
// 					<Route path="/*" element={<pages.MainPage />} /> {/* 메인 페이지 */}
// 					<Route path="/novel-detail" element={<pages.NovDetailPage />} /> {/* 소설 상세 정보 페이지 */}
// 				</Routes>
// 			</Router>
// 		</>
// 	);
// };

// export default App;
