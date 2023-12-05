// React Package Module
import { useEffect, useState } from "react";

// MUI Package Module
import { Box, styled, Typography } from "@mui/material";

// Control Component
import Buttons from "components/controls/Button";

// Constant
import { CODE, LABEL, COLOR, MESSAGE } from "common";

// API
import { getData } from "common/communication";

/** STYLE 정의 */
// 전체 영역
const Wrapper = styled(Box)({
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	padding: "0 3%",
	boxSizing: "border-box",
	paddingTop: 40,
  //  boxShadow: "inset 0 0 3px 3px blue"
});

const WholeBox = styled(Box)({
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

	const [tag, setTag] = useState([]);             // 전체 태그
	const [genre, setGenre] = useState([]);         // 선택된 장르
	const [keyword, setKeyword] = useState([]);     // 선택된 키워드

	useEffect(() => {
		getData("common/tag")
			.then((data) => {
				setTag(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

  // 태그 클릭 시 실행될 함수
	const onSelectTags = (tag, type) => {
		// 장르일 경우
		if (type === "genre") {
			if (genre.length < 2) {
        // 기존 배열에 해당 값 없다면 -1 반환, -1일 경우 배열에 추가
				if (genre.findIndex((genre) => genre === tag) === -1)
					setGenre([tag, ...genre]);
			} else {
				alert(MESSAGE.OVER_SELECTED_GENRE);
			}
		}
		// 키워드일 경우
		if (type === "keyword") {
			if (keyword.length < 3) {
				if (keyword.findIndex((keyword) => keyword === tag) === -1)
					setKeyword([tag, ...keyword]);
			} else {
				alert(MESSAGE.OVER_SELECTED_KEY_WORD);
			}
		}
	};

	// 저장 후 다음 버튼 클릭 시 실행할 기능들 함수
	const onClickNextBtn = () => {
		if (genre.length === 0 || keyword.length === 0) {
			alert(MESSAGE.MIN_SELECT_TAG);
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
				margin={"-10px 0px 5px auto"}
				onClickNextBtn={onClickNextBtn}
			/>
			<IntroMsg>{MESSAGE.SELECT_TAG_INTRO}</IntroMsg>
			<WholeBox>
				<TagBox>
					<GenreBox>
						<DivTag>{LABEL.SELECT.GENRE}</DivTag>
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
						<DivTag>{LABEL.SELECT.KEY_WORD}</DivTag>
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