const Reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((el) => el.id !== action.data);
    }
    case "EDIT": {
      return state.map((el) =>
        el.id === action.targetId ? { ...el, content: action.newContent } : el
      );
    }
    default:
      return state;
  }
};

export default Reducer;
