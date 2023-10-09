import { useState } from "react";

// Popup Component
import ModalPopup from "components/popup/ModalPopup";

// Button Component
import Buttons from "components/controls/Button";

// Header Component
import Header from "components/layout/Header"

// Icon Component
import Icons from "components/controls/Icons";

// NovelCard Component
import NovelCard from "components/contents/NovelCard";

// NovelInformation Component
import NovelInfo from "components/contents/NovelInfo";

// Table Component
import BasicTable from "components/layout/BasicTable";

// Input Component
import Inputs from "components/controls/Input";

// AuthorInfo Component
import AuthorInfo from "components/contents/AuthorInfo";

// FollowList Component
import FollowList from "components/contents/FollowList";

// Search Component
import SearchBar from "components/controls/Search";

// Dropdown Component
import DropBox from "components/controls/DropBox";

// Constant
import { CODE, LABEL, COLOR } from "common"; 

const Main = () => {
    const [modal, setModal] = useState(false); 

    return (
        <>
            <BasicTable />
            <Header />
            <button onClick={() => setModal(true)}>btn</button>
            <ModalPopup 
                open={modal}
                width={700}
                height={700}
                onClose={() => setModal(false)}
            /> 
            <Buttons 
                type={CODE.BUTTON.TAG}
                name={LABEL.BUTTONS.FANTASY}
                backgroundColor={'pink'}
            />
            <Buttons 
                type={CODE.BUTTON.TAG}
                name={LABEL.BUTTONS.FUNNY}
                backgroundColor={'skyBlue'}
            />
            <Buttons 
                type={CODE.BUTTON.TAG}
                name={LABEL.BUTTONS.HORROR}
                backgroundColor={'Orange'}
            />
            <Buttons
                type={CODE.BUTTON.BORDER}
                name={LABEL.BUTTONS.FOLLOW}
                backgroundColor={'white'}
                color={'black'}
            />
            <Buttons
                type={CODE.BUTTON.BORDER}
                name={LABEL.BUTTONS.UNFOLLOW}
                backgroundColor={'black'}
                color={'white'}
            />
            <Icons
              type={CODE.ICON.FILLHEART}
              color={COLOR.HEART_PINK}
            />       
            <Icons
              type={CODE.ICON.HEART}
              color={COLOR.HEART_PINK}
            />    
            <Icons
              type={CODE.ICON.CLOSE}
              color={COLOR.BLACK}
            />
            <Icons
              type={CODE.ICON.CAT}
              color={COLOR.BLACK}
            /> 
            <Icons
              type={CODE.ICON.SEARCH}
              color={COLOR.BLACK}
            /> 
            <NovelInfo></NovelInfo>
            <NovelCard></NovelCard> 
            <Inputs  
              label={'ID'} 
              id={'standard-basic'}
              helperText={LABEL.INPUT.VALIDATION}
            />
            <Inputs 
              label={'PW'}
              id="standard-read-only-input"
              defaultValue={'현재 값'}
              InputProps={{
                readOnly: true,
              }}
              helperText={LABEL.INPUT.VALIDATION}
            />
            <DropBox />
            <AuthorInfo />
            <FollowList />
            <FollowList />
            <FollowList />
            <FollowList />
            <SearchBar />
  
        </>
    )
};

export default Main;