const DiaryItem = ({
  onDelete,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          작성자 : {author} || 감정점수 : {emotion}
        </span>
        <div className="date">{new Date(created_date).toLocaleString()}</div>
        <div className="content">{content}</div>
        <button
          onClick={() => {
            console.log(id);
            if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
              onDelete(id);
            }
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default DiaryItem;
