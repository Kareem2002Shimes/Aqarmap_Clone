import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";
import { WaveyFlag } from "use-flags";
import { VscChevronDown } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import { FaNoteSticky } from "react-icons/fa6";
import createIcon from "../custom/createIcon";
import { Pages, Routes } from "~/constants/enums";
import { VscSignOut,  } from "react-icons/vsc";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useAxiosAuth from "~/lib/hooks/useAxiosAuth";
import axios from "~/lib/axios";
function ToggleLanguage({userSession}:{ userSession?:string | null}) {
  const [data , setData] = useState<{user:any}>()
  // const session =useSession()
  const [errorMessage,setErrorMessage]= useState("")
  const [isLoading,setIsLoading]= useState(false)
 const axiosAuth =  useAxiosAuth()
  const activitiesLinksStyles =
    "flex h-10 items-center gap-4 rounded-[10px] px-4 hover:bg-secondary hover:text-primary";
  const session = userSession && JSON.parse(userSession as string)
  const btnStyles =
    "flex cursor-pointer text-accent hover:text-black items-center gap-2 rounded-[10px] px-4 py-2 transition-colors duration-200 hover:bg-neutral";
    useEffect(()=> {
      const fetchUser = async()=>{
        setIsLoading(true)
      try{
        const userData =  await axios({
          method:"get",
          url:"/user",
          headers:{"Content-Type":"application/json" ,Authorization:`Bearer ${session.access_token}`}
        })
        if(userData.data){
          setData(userData.data)
        }
      }catch(error:any){
        setErrorMessage(error.response.data.error_description)
        console.log(error.response)
      }
      setIsLoading(false)
      }
      userSession  &&  fetchUser()
    },[])
    
  const createDropDown = (linkName: string) => {
    return (
      <div className="dropdown">
        {linkName === "language" && (
          <label tabIndex={0} className={btnStyles}>
            <WaveyFlag country="eg" fileType="webp" ratio="24x18" />
            <MdArrowDropDown className="h-6 w-6" />
          </label>
        )}

        {linkName === "auth" && (
          <label
            tabIndex={0}
            className="group flex cursor-pointer items-center gap-1 rounded-[10px] bg-neutral px-[8px] py-[4px] transition-colors duration-200 hover:bg-secondary"
          >
            <div className="rounded-full bg-white text-[#616161] transition-colors duration-200 group-hover:text-primary">
              {createIcon("user")}
            </div>
            <VscChevronDown className="h-5 w-5 group-hover:text-primary" />
          </label>
        )}
        <ul
          tabIndex={0}
          className={`dropdown-content right-0 z-[1] mt-2 w-max rounded-[6px] bg-white ${
            linkName === "language" ? "px-[10px] py-[20px]" : "p-0"
          } shadow-[0_4px_12px_0_rgba(0,0,0,.08)]`}
        >
          {linkName === "language" && (
            <li className="hidden w-fit lg:block">
              <Link
                href={"/"}
                className="element-center gap-4 rounded-[10px] px-4 py-2 text-sm font-medium capitalize text-black hover:bg-neutral"
              >
                <div className="h-6 w-6">
                  <WaveyFlag country="sa" fileType="webp" ratio="24x18" />
                </div>
                KSA
              </Link>
            </li>
          )}
          {linkName === "auth" && (
            <div className="w-[300px] max-w-full">
              { userSession  ? (
                <div className="flex flex-wrap items-center justify-between gap-4 break-all  px-[32px] py-[24px]">
                  <h3 className=" text-xl font-medium text-accent dark:text-black">
                    {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                    {!isLoading && errorMessage ? `Error : ${errorMessage}` : null}
                    {!isLoading && data && data?.user ? (data.user)?.full_name: null}
                  </h3>
                  <Link
                    href={`${Routes.ROOT}`}
                    className="text-sm font-normal text-primary hover:underline"
                  >
                    Edit Profile
                  </Link>
                </div>
              ) : (
                <div className="px-[32px] py-[24px]">
                  <h3 className="mb-2 text-2xl font-semibold text-black">
                    Log in
                  </h3>
                  <p className="mb-4 text-sm font-medium text-info">
                    place adds, take notes, save favorites and more...
                  </p>
                  <li>
                    <Link
                      href={`/${Routes.AUTH}/${Pages.LOGIN}`}
                      className="primary-btn mb-4 h-10 rounded-[20px]"
                    >
                      Log in
                    </Link>
                  
                  </li>
                </div>
              )}
              <div className="border-t border-[#e0e0e0] px-[32px] py-[24px]">
                <label className="mb-4 block text-sm font-semibold capitalize text-info">
                  My Activities
                </label>
                <li>
                  <Link href={`/`} className={`mb-2 ${activitiesLinksStyles}`}>
                    <AiOutlineHeart className="h-4 w-4" />
                    My Favorites
                  </Link>
                  <Link href={`/`} className={`mb-2 ${activitiesLinksStyles}`}>
                    <FaNoteSticky className="h-4 w-4" />
                    My Notes
                  </Link>
                  { userSession  && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          signOut({ callbackUrl: `${Routes.ROOT}` })
                        }
                        className={`${activitiesLinksStyles} mb-2 w-full`}
                      >
                        <VscSignOut className="h-4 w-4" />
                        Log out
                      </button>
                    </>
                  )}
                </li>
              </div>
            </div>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      <div className="hidden lg:block">{createDropDown("language")}</div>
      <Link href={"/"} className={`${btnStyles} hidden lg:block`}>
        عربي
      </Link>
      <Link href={"/"} className={`${btnStyles} hidden lg:block`}>
        Help?
      </Link>
      {createDropDown("auth")}
    </div>
  );
}

export default ToggleLanguage;
