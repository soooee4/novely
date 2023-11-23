// const multer = require('multer');

// // 랜덤 아이디를 생성하는 함수
// const makeRandomNickname = () => {

//   const first = [
//     '긍정적인', '매력적인', '반짝이는', '창조적인', '다양한', '열정적인', 
//     '훌륭한', '마법의', '놀라운', '평화로운', '유연한', '신비로운', '고요한', 
//     '행복한', '화려한', '용감한', '따뜻한', '자유로운', '친절한', '재미있는', 
//     '아찔한', '산뜻한', '귀여운', '무뚝뚝한', '졸린', '애교있는', '우아한', 
//     '활발한', '유쾌한', '아기자기한', '시크한', '깜찍한', '조용한', '코고는', 
//     '놀라는', '얌전한'
//   ];

//   const firstWord = first[Math.floor(Math.random() * first.length)]

//   const second = [
//     '사자', '호랑이', '곰', '여우', '늑대', '거북이', '앵무새', '원숭이', 
//     '토끼','사슴', '기린', '코알라', '침팬지', '고릴라', '다람쥐', '비버', 
//     '하이에나', '코끼리', '기린', '팬더', '펭귄', '돌고래', '상어', '가재','게', 
//     '별빛', '천사', '사탕', '꽃잎', '마법사', '버터플라이','비비디바비디부','무지개',
//     '햇살','하트','설탕', '딸기','팬더','포켓몬','연날리기','우주선', '달빛', '요정',
//     '스파클링','미니어처', '마카롱','초코렛', '벚꽃' ,'별자리' ,'유니콘 ', '펭귄', 
//     '라일락 ', '하늘', '클로버', '단풍', '눈사람', '버섯', '발자국', '꿈', '기적', 
//     '풍선껌', '유리구슬', '그림자', '인형', '햄스터', '카페라떼', '거울', '발바닥', '불꽃'
//   ];

//   const secondWord = second[Math.floor(Math.random() * second.length)];

//   const thirdNum = Math.floor(Math.random() * 100);

//   const nickName = firstWord + secondWord + thirdNum
  
//   return nickName;
  
// };

// // 폼데이터 Parsing
// const parsingFormData = multer({ limits: { fileSize: 1024 * 1024 * 2000 } }).single('img', 1);

// // 이미지 파일 업로드
// const imgFileUpload = (img) => {

// };

// // 일단 저 두 함수 이용할거구요
// // req.body에 어떻게 오는지부터 확인하고 오져 

// module.exports = {
//   makeRandomNickname,
//   parsingFormData
// };

const multer = require('multer');

// 랜덤 아이디를 생성하는 함수
const makeRandomNickname = () => {

  const first = [
    '긍정적인', '매력적인', '반짝이는', '창조적인', '다양한', '열정적인', 
    '훌륭한', '마법의', '놀라운', '평화로운', '유연한', '신비로운', '고요한', 
    '행복한', '화려한', '용감한', '따뜻한', '자유로운', '친절한', '재미있는', 
    '아찔한', '산뜻한', '귀여운', '무뚝뚝한', '졸린', '애교있는', '우아한', 
    '활발한', '유쾌한', '아기자기한', '시크한', '깜찍한', '조용한', '코고는', 
    '놀라는', '얌전한'
  ];

  const firstWord = first[Math.floor(Math.random() * first.length)]

  const second = [
    '사자', '호랑이', '곰', '여우', '늑대', '거북이', '앵무새', '원숭이', 
    '토끼','사슴', '기린', '코알라', '침팬지', '고릴라', '다람쥐', '비버', 
    '하이에나', '코끼리', '기린', '팬더', '펭귄', '돌고래', '상어', '가재','게', 
    '별빛', '천사', '사탕', '꽃잎', '마법사', '버터플라이','비비디바비디부','무지개',
    '햇살','하트','설탕', '딸기','팬더','포켓몬','연날리기','우주선', '달빛', '요정',
    '스파클링','미니어처', '마카롱','초코렛', '벚꽃' ,'별자리' ,'유니콘 ', '펭귄', 
    '라일락 ', '하늘', '클로버', '단풍', '눈사람', '버섯', '발자국', '꿈', '기적', 
    '풍선껌', '유리구슬', '그림자', '인형', '햄스터', '카페라떼', '거울', '발바닥', '불꽃'
  ];

  const secondWord = second[Math.floor(Math.random() * second.length)];

  const thirdNum = Math.floor(Math.random() * 100);

  const nickName = firstWord + secondWord + thirdNum
  
  return nickName;
  
};

// 폼데이터 Parsing
const parsingFormData = multer({ limits: { fileSize: 1024 * 1024 * 2000 } }).single('file', 1);

module.exports = {
  makeRandomNickname,
  parsingFormData
};