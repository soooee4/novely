import Header from "components/layout/Header";

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