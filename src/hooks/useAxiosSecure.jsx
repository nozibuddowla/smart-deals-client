import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    //  set token in the header for all the api call using axiosSecure hook
    // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      // console.log(config);

      config.headers.authorization = `Bearer: ${user.accessToken}`;

      return config;
    });

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return instance;
};

export default useAxiosSecure;
