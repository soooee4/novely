// // MUI Package Module
// import { Dialog, DialogContent, createTheme, ThemeProvider } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';

// /** 모든 팝업 컴포넌트의 부모가 되는 기본 모달 컴포넌트 */
// const ModalPopup = (props) => {
//   // fullWidth 속성 props에 추가하여 fullWidth일 때만 너비 100%로 설정 (novel-detail 소설 보기, 쓰기)
//   const { children, height, onClose, open, width, popupState, fullWidth } = props;

//   // 모든 모달창 뒷 배경 투명도 조절을 위한 테마 객체 생성 (전체 스타일링 적용)
//   const theme = createTheme({
//     components: {
//       MuiDialog: {
//         styleOverrides: {
//           root: {
//             backgroundColor: 'rgba(0, 0, 0, 0.7)', 
//           },
//         },
//       },
//     },
//   });

//   // Esc 버튼 누를 시 모달 창 닫기
//   const pressEsc = (e) => {
//     if (e.key === 'Escape') {
//       onClose();
//     }
//   };

//   return ( 
//     <ThemeProvider theme={theme} >
//       <Dialog
//         onKeyDown={pressEsc} 
//         open={open} 
//         fullWidth={fullWidth}
//         PaperProps={{style:{maxWidth:'100%', width: width}}}> 
//           {/* CloseIcon을 눌렀을 때 join팝업일 경우 로컬 스토리지에 profile이 있으면 새로고침. */}
//           <CloseIcon 
//             sx={{ padding: "11px 13px 0px 0px", marginLeft: "auto"}}
//               onClick={() => {
//               onClose();
//               popupState === "join" && localStorage.getItem("profile") && window.location.reload();
//             }}
//           />
//         <DialogContent 
//           sx={{
//             boxSizing: 'border-box',
//             width: fullWidth ? '100%' : width, 
//             height: height,
//             paddingTop: 0
//           }}
//         >
//           {children}
//         </DialogContent>
//       </Dialog>
//     </ThemeProvider>
//   )
// };

// export default ModalPopup;
// React Package Module
import { useState } from "react";

// MUI Package Module
import { Dialog, DialogContent, createTheme, ThemeProvider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

/** 모든 팝업 컴포넌트의 부모가 되는 기본 모달 컴포넌트 */
const ModalPopup = (props) => {
  // fullWidth 속성 props에 추가하여 fullWidth일 때만 너비 100%로 설정 (novel-detail 소설 보기, 쓰기)
  const { children, height, onClose, open, width, popupState, fullWidth, mode } = props;

  const [colorMode, setColorMode] = useState('#ffffff');

  // 모든 모달창 뒷 배경 투명도 조절을 위한 테마 객체 생성 (전체 스타일링 적용)
  const theme = createTheme({
    components: {
      MuiDialog: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          },
        },
      },
    },
  });

  // Esc 버튼 누를 시 모달 창 닫기
  const pressEsc = (e) => {
    if (e.key === 'Escape') {
      onClose();
      setColorMode("#ffffff");
      props.setColorInit && props.setColorInit();
    }
  };

  const brightDark = (click) => {
    let color;
    switch (click) {
      case 1:
        color = "#ffffff";
        break;
      case 2:
        color ="#f2e8cf";
        break;
      case 3:
        color = "#121212";
        break;
      default:
        color = "#ffffff";
    }
    setColorMode(color);
    props.setColor(color);
  };

  return ( 
    <ThemeProvider theme={theme} >
      <Dialog
        onKeyDown={pressEsc} 
        open={open} 
        fullWidth={fullWidth}
        PaperProps={{style:{maxWidth:'100%', width: width, backgroundColor: colorMode, color: colorMode === "#121212" ? "white" : "black"}}}> 
          {/* CloseIcon을 눌렀을 때 join팝업일 경우 로컬 스토리지에 profile이 있으면 새로고침. */}
          {mode && 
            <div style={{ display: "flex", margin: "10px 0 0 10px", gap: 5 }}>
              <button style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: "#ffffff" }} onClick={() => brightDark(1)}></button>
              <button style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: "#f2e8cf" }} onClick={() => brightDark(2)}></button>
              <button style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: "#121212" }} onClick={() => brightDark(3)}></button>
            </div>
          }
          <CloseIcon 
            sx={{ padding: "11px 13px 0px 0px", marginLeft: "auto", position: "absolute", right: 10, top: 3,  color: colorMode === "#121212" ? "white" : "black" }}
            onClick={() => {
              onClose();
              setColorMode("#ffffff");
              props.setColorInit && props.setColorInit();
              popupState === "join" && localStorage.getItem("profile") && window.location.reload();
            }}
          />
        <DialogContent 
          sx={{
            boxSizing: 'border-box',
            width: fullWidth ? '100%' : width, 
            height: height,
            backgroundColor: colorMode
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
};

export default ModalPopup;