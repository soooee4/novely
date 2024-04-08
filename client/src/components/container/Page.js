import Header from "components/container/Header";
import { ToastPopup } from "components/popup";

const Page = (props) => {
  
  return (
    <>
      <Header />
      {props.children}
      <ToastPopup />
    </>
  )
}

export default Page;