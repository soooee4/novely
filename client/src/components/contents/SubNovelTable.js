// React Package Module
import { useEffect, useState } from "react";

// Redux Package Module
import { useDispatch, useSelector } from "react-redux";
import { setClickSubNovel, setModalOpen } from "redux/slice";


// MUI Package Module
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from "@mui/material";

/** 서브소설 목록을 보여주는 테이블 컴포넌트 (소설 상세보기 페이지에서 사용) */
const SubNovelTable = (props) => {

  // redux state(서브 소설)
	const subNovels = useSelector((state) => state.main.subNovels);

	const [subNovelList, setSubNovelList] = useState([]);

	const dispatch = useDispatch();

  useEffect(() => {
    if (props.order === "popular") {
      const sortedData = [...subNovels].sort(
        (a, b) => b.sub_like_count - a.sub_like_count
      );
      setSubNovelList(sortedData);
    } else {
      setSubNovelList(subNovels);
    }
  }, [props.order, subNovels]);

	return (
		<TableContainer
			component={Paper}
			sx={{
				width: "100%",
				boxShadow: "none",
				border: "1px solid #E0E0E0",
				marginBottom: 5,
			}}
		>
			<Table
				sx={{
					minWidth: 750,
				}}
				aria-label="simple table"
			>
				<TableBody>
        {subNovelList.map((novel, i) => (
							<TableRow
								key={i}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
								}}
							>
								<TableCell
									onClick={() => {
										dispatch(setClickSubNovel(novel));
										dispatch(setModalOpen({
                        open: true,
                        content: "viewSubNov",
                        fullWidth: true,
                        width: "90%",
                        height: "90vh",
                    }));
									}}
									align="center"
									size="small"
									sx={{
										width: "65%",
										textAlign: "left",
										cursor: "pointer",
                    paddingLeft: 3
									}}
								>
									<div>{novel.sub_title}</div>
								</TableCell>
								<TableCell
									sx={{
										width: "20%",
									}}
								>
									By.{novel.user_nickname}
								</TableCell>
								<TableCell align="center">
									👍 {novel.sub_like_count}
								</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
					  ))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SubNovelTable;