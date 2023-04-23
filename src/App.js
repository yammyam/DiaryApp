import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useRef, useState } from "react";

// const dummyData = [
//   {
//     id: 1,
//     author: "이상태1",
//     content: "첫내용",
//     emotion: 5,
//     created_date: new Date().getTime(), //인자 아무것도 안넣으면 현재시간으로 해줌.
//   },
//   {
//     id: 2,
//     author: "이상태2",
//     content: "두번쨰 내용",
//     emotion: 5,
//     created_date: new Date().getTime(), //인자 아무것도 안넣으면 현재시간으로 해줌.
//   },
//   {
//     id: 3,
//     author: "이상태3",
//     content: "세번째  내용",
//     emotion: 5,
//     created_date: new Date().getTime(), //인자 아무것도 안넣으면 현재시간으로 해줌. gettime은 추후에 문자열변환 변환할때 데이터바꾸기 쉽도록 밀리초로 바꿔줌
//   },
// ];

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(1);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    console.log(`${targetId} 가 삭제되었습니다.`);
    const newDiaryList = data.filter((el) => el.id !== targetId);
    console.log(newDiaryList);
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onDelete={onDelete} dummyData={data} />
    </div>
  );
};

export default App;
