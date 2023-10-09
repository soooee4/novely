import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'

function createData(제목, 작성자, 추천수) {
  return {제목, 작성자, 추천수 };
}

const rows = [
  { title: '고애옹', created_user: 'userID', liked: 34 },
  { title: '고애옹', created_user: 'userID', liked: 34 },
  { title: '고애옹', created_user: 'userID', liked: 34 },
  { title: '고애옹', created_user: 'userID', liked: 34 },
  { title: '고애옹', created_user: 'userID', liked: 34 },
];

export default function BasicTable() {
  return (
    <TableContainer 
      component={Paper} 
      sx={{
        width: '80%',
        marginLeft: 10,
        marginTop: 10
    }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                align="center"
                sx={{
                  width: '70%',
                  textAlign: 'left'
                }}
                >{row.title}</TableCell>
              <TableCell  
                sx={{
                  width: '15%'
                }}align="center">{row.created_user}</TableCell>
              <TableCell align="center">{row.liked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}