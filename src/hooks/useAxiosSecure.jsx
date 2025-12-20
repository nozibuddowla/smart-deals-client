import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
    //  set token in the header for all the api call using axiosSecure hook
  return instance;
};

export default useAxiosSecure;
