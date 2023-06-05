import React, {
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import axios from "axios";
import Reducer from "./Reducer";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(Reducer, []);
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
      dispatch({ type: "INIT", data: initData });
    } catch (error) {
      console.log(error);
    }
  };

  const onCreate = useCallback((author, content, emotion) => {
    //onCreate의 변화가 없어야 DiaryEditor 의 렌더링이 여러번 일어나지않음 그렇다고 useMemo를 사용하게되면 값을 반환하기때문에 " 함수 " 를 보내는게 아니게 되니 사용하면 안됨.
    //함수반환하려면 useCallback 해야함.
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
    //함수형 업데이트를 활용하자. 상태변경함수에  함수를 넣는게 함수형 업데이튿
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", data: targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoDispatch = useMemo(() => {
    return { onCreate, onEdit, onRemove };
  }, []);

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

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis(); // 여기서 getDiaryAnalysis가 함수가아니라 리턴하는 하나의 값이기떄문에 함수로 호출하면 낫펑션 오류가 생김

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoDispatch}>
        <div className="App">
          <DiaryEditor />
          <div>전체일기 : {data.length}</div>
          <div>좋은 일기 개수 : {goodCount}</div>
          <div>안좋은 일기 개수 : {badCount}</div>
          <div>좋아요 비율 : {goodRatio}</div>
          <div>{typeof goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};
export default App;
//export default 의 default 붙이는건 파일 하나당 한번만 가능함.
//기본적으로 App.js를 내보내고 있고 그냥 export 만 붙은 부가적인 함수인 "DiaryStateContext"를 !!부가적!!으로 내보내고 있음.
