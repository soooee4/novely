import Header from "components/layout/Header";

// ? 질문
// 페이지와 헤더의 구조, 페이지를 빼서 이렇게 처리한 이유, 헤더에 메뉴 탭 처리할 때 원래 이렇게 해야하는지?
const Page = (props) => {
  
  return (
    <>
      <Header 
        profile={props.profile}
        setProfile={props.setProfile}
        logout={props.logout}
      />
      {props.children}
    </>
  )
}

export default Page;