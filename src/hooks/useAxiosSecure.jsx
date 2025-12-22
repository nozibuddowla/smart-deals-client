import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //  set token in the header for all the api call using axiosSecure hook
    // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      // console.log(config);

      const token = user.accessToken;

      if (token) {
        config.headers.authorization = `Bearer: ${token}`;
      }

      return config;
    });

    // response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
        const status = err.status;
        if (status === 401 || status === 403) {
          console.log("log out the user for bad request");
          signOutUser().then(() => {
            // navigate user to the login page
            navigate("/login");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
