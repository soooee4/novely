import Header from "components/layout/Header";

const Page = (props) => {
  
  console.log(props,555)
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