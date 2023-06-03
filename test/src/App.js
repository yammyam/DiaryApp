import { useEffect, useRef, useState, useMemo } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const initData = response.data.slice(0, 20).map((el) => {
        return {
          author: el.email,
          content: el.body,
          emotion: Math.floor(Math.random() * 5) + 1,
          created_date: new Date().getTime(),
          id: dataId.current++,
        };
      });
      setData(initData);
    } catch (error) {
      console.log(error);
    }
  };

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

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    //저장하고 싶은 함수를 감싸주면된다 .
    const analyzeDiary = () => {
      const goodCount = data.filter((el) => el.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = ((goodCount / data.length) * 100).toFixed(2);
      return { goodCount, badCount, goodRatio };
    };
    return analyzeDiary;
  }, [data]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis(); // 여기서 겟다이어리애널시스가 함수가아니라 리턴하는 하나의 값이기떄문에 함수로 호출하면 낫펑션 오류가 생김

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기 : {data.length}</div>
      <div>좋네요 : {goodCount}</div>
      <div>안좋네요 : {badCount}</div>
      <div>좋비율 : {goodRatio}</div>
      <div>{typeof goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};
export default App;
