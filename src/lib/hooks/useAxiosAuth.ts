import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "../axios";

const useAxiosAuth = () => {
    const { data: session } = useSession();
    useEffect(() => {
      const requestIntercept = axios.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  
  
      return () => {
        axios.interceptors.request.eject(requestIntercept);
      };
    }, [session]);
  
    return axios;
  };
  
  export default useAxiosAuth;