import { useEffect, useState } from "react";
import Sun from "./icons/SunIcon";
import Moon from "./icons/MoonIcon";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const element = document.documentElement;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  // console.log(mediaQuery);

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      element.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      element.classList.remove("dark");
      element.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [element.classList, theme]);

  mediaQuery.addEventListener("change", (e) => {
    localStorage.removeItem("theme");
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
      } else {
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setTheme("light");
      }
    }
  });

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && mediaQuery.matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [mediaQuery]);

  return (
    <header className="flex items-center justify-between text-[#4b6a9b] dark:text-[#fff]">
      <h1 className="text-[1.6rem] font-bold  tracking-wide md:text-3xl">
        devfinder
      </h1>
      <div className="flex flex-row">
        {theme === "dark" && (
          <div className="flex items-center gap-5 active:scale-[.95]">
            <span
              onClick={() => setTheme("light")}
              className="flex  cursor-pointer items-center gap-5 text-[.78rem] font-bold uppercase tracking-[.15em] md:text-base"
            >
              light <Sun size={26} fill={"#fff"} />
            </span>
          </div>
        )}
        {theme === "light" && (
          <div className="flex items-center gap-5 active:scale-[.95]">
            <span
              onClick={() => setTheme("dark")}
              className="flex cursor-pointer items-center  gap-5 text-[.78rem] font-bold uppercase tracking-[.15em] md:text-base"
            >
              dark
              <Moon size={26} fill={"#4b6a9b"} />
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
