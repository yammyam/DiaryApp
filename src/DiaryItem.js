import { useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  const localContentInput = useRef();
  const [isEdit, setIsEdit] = useState(false); // 수정중인지 아닌지 두가지 상태를 판단할려고 boolean 값으로 설정함.//버튼눌렀다 안눌렀다 둘중하나란것.
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const [localContent, setLocalContent] = useState(content);

  const handleRemove = () => {
    console.log(id);
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      toggleIsEdit();
      onEdit(id, localContent);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          작성자 : {author} || 감정점수 : {emotion}
        </span>
        <div className="date">{new Date(created_date).toLocaleString()}</div>
        <div className="content">
          {isEdit ? (
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            ></textarea>
          ) : (
            <>{content}</>
          )}
        </div>
        {isEdit ? (
          <>
            <button onClick={handleQuitEdit}>수정취소</button>
            <button onClick={handleEdit}>수정완료</button>
          </>
        ) : (
          <>
            <button onClick={handleRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DiaryItem;
