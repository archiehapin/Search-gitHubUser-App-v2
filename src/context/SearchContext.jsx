import { createContext, useContext, useReducer } from "react";
import searchReducer, { initialState } from "./searchReducer";

const SearchContext = createContext(initialState);

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const searchStr = (search) => {
    dispatch({ type: "SEARCH_STRING", search });
  };

  const searchData = (data) => {
    dispatch({ type: "SEARCH_DATA", data });
  };

  const hasError = (error) => {
    dispatch({ type: "HAS_ERROR", error });
  };

  const isPending = (pending) => {
    dispatch({ type: "SEARCH_PENDING", pending });
  };

  const value = {
    data: state.data,
    search: state.search,
    pending: state.isPending,
    error: state.error,
    searchStr,
    searchData,
    hasError,
    isPending,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearch must be used within SearchContext");
  }

  return context;
};

export default SearchProvider;
