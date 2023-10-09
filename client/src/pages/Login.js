import { useState } from "react";

// Header Component
import Header from "components/layout/Header"

// Popup Component
import ModalPopup from "components/popup/ModalPopup";

const Login = () => {
  const [modal, setModal] = useState(false); 
  
  // 모달 open/close
  const showModal = () => {
    setModal(true);
  };

    return (
    <>
      <Header
        showModal={showModal}
      />
      {/* <button onClick={() => setModal(true)}>btn</button> */}
      <ModalPopup 
        open={modal}
        width={600}
        height={400}
        onClose={() => setModal(false)}
      /> 
    </>
    )
};

export default Login;