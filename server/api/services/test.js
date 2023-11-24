
// const test = () => {

//     const a = 1;
//     const b = 2;

//     let data;

//     if (a === 1) {
//         data = 'a는 1이다'
//     } else {
//         if (b === 2) {
//             data = 'b는 2이다'
//         } else {
//             data = 'b는 2가 아니다'
//         }
//     } else {
//         data = 'a는 1이 아니다'
//     }

//     return data;
// }

// 이런 모양새라는 거죠
// 아까 과장님이 만든 형태는 어떤지 보여드릴게요 
// 자 이렇게 만들면
// 가장 아래 data 글자 색이 아까랑 다르죠? 
// 즉 저기 if문 안에 지역변수로 다 선언했기 대문에

// if문 밖에 존재하는(더 상위 애들은) 나보다 더 하위에 존재하는 애들이 선언한건
// 전혀 읽을 수 없다는 겁니다 
// 즉 지역 변수는 읽어낼 수 없어요

// 그래서 가장 상위에 변할 수 잇는 변수 선언인 let과  변수명이 data인   let data;(let은 초깃값 필요없음) 를 선언해놓고
// if문에서 각자 조건마다  data라는 변수에  string을 담아주고
// 코드는 위에서 부터 아래로 흐르니까
// 일단 저 조건문 중 하나에 무조건 걸려서 data라는 변수에 string이 담아진 채로

// return까지 내려옵니다
// 그 때 data는    'a는 1이다', 'b는 2이다' 등 어떤 string이라도 담겨잇는 상태겠죠
// 그 상태로 retrun 해주는 겁니다

// 이해가 가시나요? 
// 이걸 바탕으로 저 AuthService   editProfile 코드를 이해하시면 돼요 넵