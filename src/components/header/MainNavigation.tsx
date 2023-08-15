import HeaderNav from "./HeaderNav";
import ToggleLanguage from "./ToggleLanguage";
import { HiOutlineBars3 } from "react-icons/hi2";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiSun, BiMoon } from "react-icons/bi";
import createIcon from "../custom/createIcon";
import { User } from "next-auth";
const MainNavigation = ({userSession}:{  userSession?:string | null}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full bg-base-100 py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="element-center h-7 w-9 rounded-[0.25rem] border border-[rgba(0,0,0,.1)] transition-colors duration-200 hover:bg-neutral lg:hidden"
          >
            <HiOutlineBars3 className="h-5 w-5" />
          </button>
          <Link href="/" className="h -[35px] w-[170px] text-primary">
            {createIcon("english-logo")}
          </Link>
        </div>

        <HeaderNav />
        <div className="flex items-center gap-4 ">
          <ToggleLanguage userSession={userSession}/>
          <button
            className="relative z-10 hidden h-[40px] w-[40px] items-center justify-center text-xl text-primary md:flex"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <BiSun className="relative -z-10" />
              ) : (
                <BiMoon className="relative -z-10" />
              )
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
