// import axios from "axios";

// export const getData = async () => {
//   try {
//     const response = await axios.get("http://localhost:8080/api/novel/getNovel")

//     // 자 원래 이렇게 되어있었고 이걸로 확인한 다음에 url을 넘긴다고 하셨죠 
//     // 일단 res라는 변수에 통신한것에 대한 결과값을 넣고 있구요
//     // 첫번째로 url도 틀렸어요
//     // novely일텐데 novel 이구요
//     // 이거 자체를 지금 주석 처리할테니 제가 말한대로 한번 해보세요 
    
//     // 그리고 res.data가 빈 값으로 왔으면
//     // 일단 res를 먼저 콘솔에 찍어보고
//     // res 안에 프로퍼티가 뭐가잇지? data는 있는건가? 라는걸 확인하셨어야 하구요

//     // 제일 중요한 잘되던 소스를 그대로 가져다 붙여놓은 다음에 고치는걸 안하고
//     // 가져온 후 일단 임의대로 내가 아는대로 막 고치니까
//     // 디버깅 자체가 어려운거에요 
//     // 잘 되던 소스는 일단 그대로 가져다 붙인다 => 정말 습관화하셔야 합니다
//     // 밑으로 와보세요 
    
//     if (res.status === 200) {
//       console.log(res.data)
//       return response.data;
//       // 그리고 여기 보시면 지금 리턴문에
//       // response라는 객체안에 있는 data를 리턴한다고 되어있는데
//       // response는 지금 여기 소스 어디에도 정의되어 있지 않아요
//       // res만 있죠 
//       // 블루버드는 const response = ~~ 이렇게 되어있으니
//       // return response.data; 일거구요 
//     }

//   } catch(err) {
//     console.log(err);
//   }
// };
 
// 이게 그대로 가져온거에요 여기서 변수명이나 이런거 함부로 바꾸면 안되고
// 혹시라도 바꿀꺼면 그 변수가 어디에서 쓰였는지 확인한 다음에
// 일괄적으로 바꿔주는 걸 생각하셔야 해요 
import axios from "axios";

export const getData = async (url, params) => {
  try {
    const response = await axios
    .get(`http://localhost:8080/api/${url}`, {
      params: params,
    })

    if (response.data) {
      return response.data;
    }

  } catch(err) {
    console.log(err);
  }
};


export const postData = async (url, params) => {
  try {
    const response = await axios
      .post(`http://localhost:8080/api/${url}`, {
      params
    })
    console.log(response);
    // return response.data;

  } catch (err) {
    console.log(err);
  }
}

// axios
// .post("http://localhost:8080/api/auth/login", {
//   login_id: id,
//   login_pw: pw,
// })
// .then(function (res) {
//   // console.log(res.data);
//   if (res.data === true) {
//     alert("로그인 성공");
//     localStorage.setItem("id", id);
//     props.closeModal(); 
//     props.isLogin();
//     // 성공을 했으니 아까 내려받은 props.isLogin 함수를 실행하면 Main.js의 isLogin값이 true로 바뀌겠죠
//     // localStorage.clear();				
//   } else {
//     alert("로그인 실패");
//   } 
// }) 
// .catch(function (error) {
//   console.log(error);
// })