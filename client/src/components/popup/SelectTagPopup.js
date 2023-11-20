// export default SelectTagPopup;
import { useEffect, useState } from "react";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { Box, styled, Typography } from "@mui/material";
import { CODE, LABEL, COLOR } from "common";

import { getData } from "common/communication";

// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	// border:'3px solid blue',
	marinTop: "-30px",
});

const WholeBox = styled(Box)({
	// border: "2px solid yellow",
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	gap: 10,
	marginTop: 20,
	boxSizing: "border-box",
});

// 전체 태그 영역
const TagBox = styled(Box)({
	flex: 1,
	height: "100%",
	boxSizing: "border-box",
});

// 선택된 태그 표시 영역
const SelectedTagBox = styled(Box)({
	flex: 1,
	height: "100%",
	padding: 10,
	boxSizing: "border-box",
});

// 장르 태그 영역
const GenreBox = styled(Box)({
	padding: 10,
	boxSizing: "border-box",
	width: "100%",
});

// 키워드 태그 영역
const KeywordBox = styled(Box)({
	padding: 10,
	boxSizing: "border-box",
});

// 상단 안내 메세지 영역
const IntroMsg = styled(Typography)({
	fontSize: 18,
	fontWeight: "bolder",
	textAlign: "center",
	marginBottom: -5,
});

// 장르, 키워드 구분 텍스트
const DivTag = styled(Typography)({
	fontSize: 14,
	marginBottom: 10,
});

/** 서브 소설 작성 후 태그 선택하는 팝업 */
const SelectTagPopup = (props) => {

const [tag, setTag] = useState([]);
	// 선택된 태그 저장할 변수
	const [genre, setGenre] = useState([]);
	const [keyword, setKeyword] = useState([]);

	useEffect(() => {
		getData("common/tag")
			.then((data) => {
				setTag(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const onSelectTags = (tag, type) => {
		// 장르일 경우
		if (type === "genre") {
			if (genre.length < 2) {
				if (genre.findIndex((genre) => genre === tag) === -1)
					setGenre([tag, ...genre]);
			} else {
				alert("장르는 2개까지 선택 가능해요");
			}
		}
		// 키워드일 경우
		if (type === "keyword") {
			if (keyword.length < 3) {
				if (keyword.findIndex((keyword) => keyword === tag) === -1)
					setKeyword([tag, ...keyword]);
			} else {
				alert("키워드는 3개까지 선택 가능해요");
			}
		}
	};

	// 저장 후 다음 버튼 클릭 시 실행할 기능들 함수
	const nextBtnHandler = () => {
		if (genre.length === 0 || keyword.length === 0) {
			alert("장르, 키워드는 최소 1개씩 선택해주세요");
		} else {
			props.changeState();
			props.setTags({
				genre: genre,
				keyword: keyword,
			});
		}
	};

	return (
		<Wrapper>
			<Buttons
				type={CODE.BUTTON.BASIC}
				backgroundColor={COLOR.WHITE}
				color={COLOR.BLACK}
				name={LABEL.BUTTONS.GOTONEXT}
				// width={100}
				margin={"-10px 0px 5px auto"}
				nextBtnHandler={nextBtnHandler}
				// changeState={props.changeState}
			/>
			<IntroMsg>
				어떤 느낌의 이야기로 완성하셨나요? <br />
				적절한 태그를 설정해보세요 :)
			</IntroMsg>
			<WholeBox>
				<TagBox>
					<GenreBox>
						<DivTag>장르</DivTag>
						{tag
							.filter((list) => list.group_code === "GENRE")
							.map((list, i) => {
								return (
									<Buttons
										key={i}
										type={CODE.BUTTON.TAG}
										name={list.code_name}
										backgroundColor={`#${list.color}`}
										onSelectTags={() => onSelectTags(list, "genre")}
									/>
								);
							})}
					</GenreBox>
					<KeywordBox>
						<DivTag>키워드</DivTag>
						{tag
							.filter((list) => list.group_code === "KEYWORD")
							.map((list, i) => {
								return (
									<Buttons
										key={i}
										type={CODE.BUTTON.TAG}
										name={list.code_name}
										backgroundColor={`#${list.color}`}
										onSelectTags={() => onSelectTags(list, "keyword")}
									/>
								);
							})}
					</KeywordBox>
				</TagBox>
				<SelectedTagBox>
					{genre.map((tag, i) => {
						return (
							<Buttons
								key={i}
								type={CODE.BUTTON.TAG}
								name={tag.code_name}
								backgroundColor={`#${tag.color}`}
							/>
						);
					})}
					{keyword.map((tag, i) => {
						return (
							<Buttons
								key={i}
								type={CODE.BUTTON.TAG}
								name={tag.code_name}
								backgroundColor={`#${tag.color}`}
							/>
						);
					})}
				</SelectedTagBox>
			</WholeBox>
		</Wrapper>
	);
};

export default SelectTagPopup;
