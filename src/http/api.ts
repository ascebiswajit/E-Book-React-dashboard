import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({
  //todo:move the valure to env
  baseURL: "http://localhost:5055",
  headers: {
    "Content-Type": "application/json",
  },
});

//added the interseptor for access the token and check in every response
api.interceptors.request.use((config)=>{
    const token = useTokenStore.getState().token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})




export const login = async (data: { email: string; password: string }) => {
  return api.post("api/users/login", data);
};
export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("api/users/register", data);
};
export const getBooks = async () => {
  return api.get("api/books");
};
export const createBook = async (data: FormData) => {
  return api.post("api/books/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
