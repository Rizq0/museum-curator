import { ReactNode, useState, useEffect } from "react";
import { Switch } from "./ui/switch";
import {
  IconSunHigh,
  IconMoonStars,
  IconHome,
  IconHeart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();
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

  const handleHome = () => {
    navigate("/");
  };

  const handleFavourites = () => {
    navigate("/collections");
  };

  return (
    <div className="bg-lbg-purple dark:bg-dbg-purple min-h-screen min-w-[365px] flex flex-col items-center">
      <div className="max-w-[1280px] p-4 w-full flex flex-col min-h-screen">
        <header className="flex flex-row justify-between items-center w-full py-4">
          <div className="flex items-center space-x-4">
            <div
              className="hover:text-dbuttonbg-pink text-dbg-purple dark:text-dheadline-white cursor-pointer"
              aria-label="Home"
            >
              <IconHome height={48} width={48} onClick={handleHome} />
            </div>
            <div className="hover:text-dbuttonbg-pink text-dbg-purple dark:text-dheadline-white cursor-pointer">
              <IconHeart height={48} width={48} onClick={handleFavourites} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="darkmodetoggle"
              checked={darkMode}
              onCheckedChange={toggleTheme}
              className="cursor-pointer bg-dbg-purple dark:bg-dheadline-white"
              aria-label="Toggle Dark Mode"
            />
            {!darkMode ? (
              <IconSunHigh
                height={35}
                width={35}
                className="text-dbg-purple dark:text-dheadline-white"
              />
            ) : (
              <IconMoonStars
                height={35}
                width={35}
                className="text-dbg-purple dark:text-dheadline-white"
              />
            )}
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="w-full text-center py-4">FOOTER</footer>
      </div>
    </div>
  );
};
