import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, onRemove, dummyData }) => {
  console.log(dummyData);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{dummyData.length}개의 내용이 있습니다</h4>
      <div>
        {dummyData.map((el) => (
          <DiaryItem onEdit={onEdit} key={el.id} {...el} onRemove={onRemove} /> //두개 건너서 가니까 이런걸 프롭스 드릴링이라고 함.
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  dummyData: [],
};

export default DiaryList;
