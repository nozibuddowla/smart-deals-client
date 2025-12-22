import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  //  set token in the header for all the api call using axiosSecure hook
  instance.interceptors.request.use((config) => { 
    console.log(config);

    config.headers.authorization = `Bearer: ${user.accessToken}`;

    return config;
  });
  return instance;
};

export default useAxiosSecure;
