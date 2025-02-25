import { ReactNode, useState, useEffect } from "react";
import { Switch } from "./ui/switch";
import { IconSunHigh, IconMoonStars, IconHome } from "@tabler/icons-react";
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

  return (
    <div className="bg-lbg-purple dark:bg-dbg-purple min-h-screen min-w-[365px] flex flex-col items-center">
      <div className="max-w-[1280px] p-4 w-full">
        <header className="flex flex-row justify-between items-center w-full">
          <div className="hover:text-dbuttonbg-pink">
            <IconHome height={48} width={48} onClick={handleHome} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="darkmodetoggle"
              checked={darkMode}
              onCheckedChange={toggleTheme}
            />
            {!darkMode ? (
              <IconSunHigh height={35} width={35} />
            ) : (
              <IconMoonStars height={35} width={35} />
            )}
          </div>
        </header>

        <main>{children}</main>

        <footer>FOOTER</footer>
      </div>
    </div>
  );
};
