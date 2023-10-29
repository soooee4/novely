// MUI Package Module
import { Button, styled } from '@mui/material';

// Constant
import { CODE, COLOR } from 'common'; 
 
// 기본 버튼
const BasicBtn = styled(Button)({
    color: COLOR.BLACK,
    borderRadius: 5
    // ":hover": {
    //     border
    // }
});

// 팔로우 버튼
const BorderBtn = styled(Button)({
    height: 10,
    fontWeight: 700,
    border: `1px solid ${COLOR.BLACK}`,
    borderRadius: 7,
    padding: 15
}); 

// 태그 버튼
const TagBtn = styled(Button)({
    height: 15,
    // minWidth: ,
    borderRadius: 7,
    color: COLOR.BLACK,
    // padding: '7px 8px',
    fontSize: 9,
    marginLeft: 5
});

const Buttons = (props) => {
    if (props.type === CODE.BUTTON.BASIC) {
        return (
            <BasicBtn 
              onClick= {() => {
                props.showModal && props.showModal();
                props.changeState && props.changeState();
              }}
              style={{
                width: props.width,
                height: props.height,
                margin: props.margin,
                padding: props.padding,
                fontSize: props.fontSize,
                fontWeight: props.fontWeight
                

            }}
            >
                {props.name}
            </BasicBtn>
        )
    } else if (props.type === CODE.BUTTON.TAG) {
        return (
            <TagBtn
                onClick={props.onClick}
                style={{
                    backgroundColor: props.backgroundColor,
                    margin: props.margin,
                    padding: props.padding,
                    fontSize: props.fontSize
                }}
            >
                #{props.name}
            </TagBtn>
        )
    } else if (props.type === CODE.BUTTON.BORDER) {
        return (
          // 여러개의 함수 넣기
            <BorderBtn
              onClick= {() => {
                // props로 넘어온 값이 null, undefined가 아닐 경우에만 해당 함수 실행하도록 조건 부여
                props.showModal && props.showModal();
                // props.closeModal && props.closeModal();
                props.changeState && props.changeState();
                props.onSubmit && props.onSubmit();
                props.logout && props.logout();
              }}
              
              style={{
                  backgroundColor: props.backgroundColor,
                  color: props.color,
                  width: props.width,
                  height: props.height,
                  margin: props.margin,
                  padding: props.padding,
                  fontSize: props.fontSize
                }}
            >
                {props.name}
            </BorderBtn>
        )
    }
}; 
    
export default Buttons;