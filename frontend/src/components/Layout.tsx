import { ReactNode, useState, useEffect } from "react";
import { Switch } from "./ui/switch";
import {
  IconSunHigh,
  IconMoonStars,
  IconHome,
  IconHeart,
  IconBrandGithub,
  IconBrandLinkedin,
  IconListDetails,
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
    navigate("collections");
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
        <hr className="w-full bg-dbg-purple dark:bg-dbuttonbg-pink h-[4px] mt-8 mb-8 rounded" />

        <main className="flex-grow">{children}</main>

        <hr className="w-full bg-dbg-purple dark:bg-dbuttonbg-pink h-[4px] mt-8 mb-8 rounded" />
        <footer className="w-full text-center py-4">
          <div className="flex flex-row justify-center sm:justify-between items-center flex-wrap gap-4">
            <div className="flex flex-col justify-between items-center bg-dbg-purple dark:bg-dbuttonbg-pink text-lbuttonbg-white dark:text-dbg-purple rounded p-2">
              <h1 className="text-lg font-semibold">
                Museum Curator - Freelance Demo / MVP
              </h1>
              <h1 className="text-lg font-semibold">Created By Joe Brown</h1>
            </div>
            <div className="flex flex-row justify-between items-center gap-4">
              <a
                href="https://github.com/Rizq0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-dbuttonbg-pink text-dbg-purple dark:text-dheadline-white cursor-pointer"
              >
                <IconBrandGithub height={48} width={48} />
              </a>
              <a
                href="https://github.com/Rizq0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-dbuttonbg-pink text-dbg-purple dark:text-dheadline-white cursor-pointer"
              >
                <IconBrandLinkedin height={48} width={48} />
              </a>
              <a
                href="https://github.com/Rizq0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-dbuttonbg-pink text-dbg-purple dark:text-dheadline-white cursor-pointer"
              >
                <IconListDetails height={48} width={48} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
