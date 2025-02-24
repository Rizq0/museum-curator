import { Button } from "../components/ui/button";
import { ReactNode, useState, useEffect } from "react";

const initialiseTheme = () => {
  try {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
      localStorage.setItem("theme", "light");
    }
    return currentTheme || "light";
  } catch (error) {
    console.error("Error while initialising theme", error);
    return "light";
  }
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const theme = initialiseTheme();
    return theme === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = prev ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return !prev;
    });
  };

  return (
    <div className="bg-lbg-purple dark:bg-dbg-purple min-h-screen min-w-[365px] flex flex-col items-center">
      <div className="max-w-[1280px] p-4 w-full">
        <header className="flex flex-row justify-between items-center w-full">
          <h1 className="text-3xl underline text-ltext-purple dark:text-dheadline-white">
            React App
          </h1>
          <p className="text-2xl underline text-ltext-purple dark:text-dheadline-white">
            React App with TypeScript
          </p>
          <Button onClick={toggleTheme}>Click me</Button>
        </header>

        <main>{children}</main>

        <footer>FOOTER</footer>
      </div>
    </div>
  );
};
