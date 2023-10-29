// import { useState } from "react";

// export default Test = () => {

//   const [a, setA] = useState(0)

//   const handleSub = ()=>{
//     setA(a-1)
//   }
//   const handlePlus = ()=>{
//     setA(a+1)
//   }

//   return <>
//       <button type="button" onClick={handleSub}>-</button>
//     <div>{a}</div>
//     <button type="button" onClick={handlePlus}>+</button>
//   </>;
// }

// // 가상돔
// // 상태변화가 일어나면 가상돔에서 일어나는일
// // 상태변화가 일어나면
// // 이전 가상돔, 새로운 가상돔 비교하여
// // 달라진 부분만 탐지해서 업데이트

// // 상태업데이트 setState => 비동기 동작이므로
// // 하나의 동작에서 일어나는 상태변화를 모아놨다가 일괄처리를 함

// useEffect(()=>{
//   console.log('async/await')
//   async function get() {
//     try{
//     const data = await getData("novel/getNovel");
//     setNovelData(data)
//     } catch (err){
//       console.log(err)
//     }
//   }
//   get()
// },[])