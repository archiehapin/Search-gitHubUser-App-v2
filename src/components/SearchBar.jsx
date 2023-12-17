import { useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import { useSearch } from "../context/SearchContext";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const { searchStr, hasError, pending } = useSearch();

  const handleKeyDownPress = (event) => {
    if (event.key === "Enter") {
      searchStr(input);
      setInput("");
      hasError(null);
    }
  };

  const handleClickSearch = () => {
    setInput("");
    hasError(null);
    searchStr(input);
  };

  const handleClickClose = () => {
    if (input.length > 0) {
      setInput("");
    }
  };

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div
      className="mt-7 flex w-full items-center justify-between rounded-[15px] bg-[#fefefe] shadow-lg 
    dark:bg-[#1E2A47] md:rounded-[8px] "
    >
      <div className="flex w-full items-center">
        <span className="pointer-events-none absolute ml-3 md:ml-5 md:h-[25px] md:w-[25px]">
          <svg className="h-[25px] w-[25px] fill-[#4196f8]">
            <path d="M10.609 0c5.85 0 10.608 4.746 10.608 10.58 0 2.609-.952 5-2.527 6.847l5.112 5.087a.87.87 0 01-1.227 1.233l-5.118-5.093a10.58 10.58 0 01-6.848 2.505C4.759 21.16 0 16.413 0 10.58 0 4.747 4.76 0 10.609 0zm0 1.74c-4.891 0-8.87 3.965-8.87 8.84 0 4.874 3.979 8.84 8.87 8.84a8.855 8.855 0 006.213-2.537l.04-.047a.881.881 0 01.058-.053 8.786 8.786 0 002.558-6.203c0-4.875-3.979-8.84-8.87-8.84z" />
          </svg>
        </span>
        <input
          autoComplete="off"
          className="h-[40px] w-full rounded-[15px] pl-[40px] pr-2 text-[.78rem] text-[#4b6a9b] outline-none disabled:cursor-not-allowed dark:bg-[#1E2A47] dark:text-slate-50 dark:caret-slate-200 dark:placeholder:text-[#fff] md:h-[65px] md:pl-[55px] md:text-base"
          value={input}
          disabled={pending}
          type="text"
          // disabled={isPending}
          name="search"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDownPress}
          placeholder="Search GitHub username..."
        />

        {input && (
          <span onClick={handleClickClose}>
            <CloseIcon
              size={28}
              fill={"#4b6a9b"}
              style={"dark:fill-[#FFFFFF] pr-[7px]"}
            />
          </span>
        )}
      </div>
      <button
        onClick={handleClickSearch}
        disabled={!input}
        className="my-2 mr-3 h-[40px] rounded-[10px] bg-[#0079ff] px-3 text-sm font-bold text-slate-50 duration-100 hover:opacity-75 active:scale-[.97] disabled:cursor-not-allowed md:h-[50px] md:px-7"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
