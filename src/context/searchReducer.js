export const initialState = {
  search: "inspect",
  isPending: false,
  error: null,
  data: {},
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_STRING":
      return {
        ...state,
        search: action.search,
      };

    case "SEARCH_DATA":
      return {
        ...state,
        data: action.data,
      };

    case "SEARCH_PENDING":
      return {
        ...state,
        isPending: action.pending,
      };

    case "HAS_ERROR": {
      return {
        ...state,
        error: action.error,
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default searchReducer;
