// 랜덤 아이디를 생성하는 함수

const makeRandomNickname = () => {

  const first = [
    '긍정적인', '매력적인', '반짝이는', '창조적인', '다양한', '열정적인', '훌륭한', '마법의', '놀라운', '평화로운', '유연한', '신비로운', '고요한', '행복한', '화려한', '용감한', '따뜻한', '자유로운', '친절한', '재미있는', '아찔한', '산뜻한', '귀여운', '무뚝뚝한', '졸린', '애교있는', '우아한', '활발한', '유쾌한', '아기자기한', '시크한', '깜찍한', '조용한', '코고는', '놀라는', '얌전한'
  ];

  const firstWord = first[Math.floor(Math.random() * first.length)]
  // console.log(firstWord);


  const second = [
    '사자', '호랑이', '곰', '여우', '늑대', '거북이', '앵무새', '원숭이', '토끼','사슴', '기린', '코알라', '침팬지', '고릴라', '다람쥐', '비버', '하이에나', '코끼리', '기린', '팬더', '펭귄', '돌고래', '상어', '가재','게', '별빛', '천사', '사탕', '꽃잎', '마법사', '버터플라이','비비디바비디부','무지개','햇살','하트','설탕', '딸기','팬더','포켓몬','연날리기','우주선', '달빛', '요정','스파클링','미니어처', '마카롱','초코렛', '벚꽃' ,'별자리' ,'유니콘 ', '펭귄', '라일락 ', '하늘', '클로버', '단풍', '눈사람', '버섯', '발자국', '꿈', '기적', '풍선껌', '유리구슬', '그림자', '인형', '햄스터', '카페라떼', '거울', '발바닥', '불꽃'
  ];

  const secondWord = second[Math.floor(Math.random() * second.length)];
  // console.log(secondWord);
  

  const thirdNum = Math.floor(Math.random() * 100);

  const nickName = firstWord + secondWord + thirdNum
  
  return nickName;
  // console.log(nickName);
 }
  // 닉네임 첫번째 인자 랜덤 뽑기 함수
  // const firstWord = () => {
  //     const randomIndex = Math.floor(Math.random() * first.length);
  //     const randomName = first[randomIndex]
  //     return first[num];
  // };

  // // 닉네임 두번째 인자 랜덤 뽑기 함수
  // const secoundWord = () => {

  //     return
  // };

  // const nickname = `${f()}` + `${b()}`;

  // return nickname;

  module.exports = {
    makeRandomNickname
  }