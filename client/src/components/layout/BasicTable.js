// MUI Package Module
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from "@mui/material";
import { CODE } from "common";

/** 서브소설 목록을 보여주는 테이블 컴포넌트 (소설 상세보기 페이지에서 사용) */
const BasicTable = (props) => {

	return (
		<TableContainer
			component={Paper}
			sx={{
				width: "100%",
				boxShadow: "none",
				border: "1px solid #E0E0E0",
        marginBottom: 5
			}}
		>
			<Table
				sx={{
					minWidth: 750,
				}}
				aria-label="simple table"
			>
				<TableBody>
					{props.subNovelData && props.isPopular === false
						? props.subNovelData.map((novel, i) => (
								<TableRow
									// map 메서드 사용 시 key값으로 각 항목을 식별 (id, index 등)
									key={i}
									sx={{
										"&:last-child td, &:last-child th": { border: 0 },
									}}
								>
									<TableCell
										onClick={() => {
											// 클릭 이벤트에 NovDetail에서 받은 index 상태값에 파라미터로 넘겨받는 index를 넣어줌
											props.setNovelIdx(i);
											props.changeState();
											props.showModal();
										}}
										align="center"
										size="small"
										sx={{
											width: "60%",
											textAlign: "left",
											cursor: "pointer",
										}}
									>
										<div>{novel.sub_title}</div>
									</TableCell>
									<TableCell
										sx={{
											width: "27%",
										}}
									>
										By.{novel.user_nickname}
									</TableCell>
									<TableCell align="center">👍 {novel.sub_like_count}</TableCell>
                  <TableCell align="center">
                  </TableCell>
								</TableRow>
						  ))
						: // isPopular가 true일 경우 popularOrder 데이터를 뿌려줌
						  props.popularOrder.map((novel, i) => (
								<TableRow
									// map 메서드 사용 시 key값으로 각 항목을 식별 (id, index 등)
									key={i}
									sx={{
										"&:last-child td, &:last-child th": { border: 0 },
									}}
								>
									<TableCell
										onClick={() => {
											// 클릭 이벤트에 NovDetail에서 받은 index 상태값에 파라미터로 넘겨받는 index를 넣어줌
											props.setNovelIdx(i);
											props.changeState();
											props.showModal();
										}}
										align="center"
										size="small"
										sx={{
                      width: "60%",
											textAlign: "left",
											cursor: "pointer",
										}}
									>
										<div>{novel.sub_title}</div>
									</TableCell>
									<TableCell
										sx={{
											width: "27%",
										}}
										// align="center"
									>
										By.{novel.user_nickname}
									</TableCell>
									<TableCell align="center">👍 {novel.sub_like_count}</TableCell>
                  <TableCell align="center">
                  </TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BasicTable;
