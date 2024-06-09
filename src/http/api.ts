import axios from 'axios';

const api = axios.create({
    //todo:move the valure to env
    baseURL:"http://localhost:5055",
    headers:{
        "Content-Type":"application/json"
    }
});

export const login = async(data:{email:string; password:string})=>{
    return api.post('api/users/login',data)

}
export const register = async(data:{name:string;email:string; password:string})=>{
    return api.post('api/users/register',data)

}
export const getBooks = async()=>{
    return api.get('api/books')

}