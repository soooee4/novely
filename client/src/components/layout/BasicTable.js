import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'

const BasicTable = (props) => {
  // console.log(props)
  return (
    <TableContainer 
      component={Paper} 
      sx={{
        width: '100%',
        boxShadow: 'none', 
        border: '1px solid #E0E0E0', 
    }}>
      <Table 
        sx={{ 
          minWidth: 650,
        }} 
      aria-label="simple table"
      >
        <TableBody>
          {props.subNovelData && props.subNovelData.map((novel, i) => (
            <TableRow
              key={i}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell 
                align="center"
                size= "small"
                sx={{
                  width: '65%',
                  textAlign: 'left',
                }}
                >{novel.sub_title}</TableCell>
              <TableCell  
                sx={{
                  width: '25%'
                }}align="center">사용자 아이디</TableCell>
              <TableCell align="center">{novel.sub_like_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
