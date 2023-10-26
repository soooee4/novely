// MUI Package Module
import { Dialog, DialogTitle, DialogContent,} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


const ModalPopup = (props) => {
  // console.log(props,12)
  const { children, height, onClose, open, width, popupState } = props;

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
  return ( 
    <ThemeProvider theme={theme}>
    <Dialog 
      open={open} 
      PaperProps={{style:{maxWidth:'100%'}}}

> 
      <DialogTitle>
        {/* CloseIcon을 눌렀을 때 join팝업일 경우 로컬 스토리지에 profile이 있으면 새로고침을 한다. */}
        <CloseIcon 
          // onClick={onClose} 
          onClick={() => {
            onClose();
            popupState === "join" && localStorage.getItem("profile") && window.location.reload();
          }}
        />
      </DialogTitle>
      <DialogContent 
        sx={{ 
          width: width, 
          height: height 
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
    </ThemeProvider>
  )
};

export default ModalPopup;

