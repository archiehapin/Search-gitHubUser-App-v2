"use client";

import Header from "./components/Header";
import Main from "./components/Main";
import { useSearch } from "./context/SearchContext";
import ErrorPage from "./components/ErrorPage";

function App() {
  const { error } = useSearch();
  if (error === "Something went wrong") return <ErrorPage />;
  return (
    <div className="container mx-auto -mt-5 mb-5 w-[327px] pt-10 md:w-[573px] xl:w-[730px]">
      <Header />
      <Main />
    </div>
  );
}

export default App;
