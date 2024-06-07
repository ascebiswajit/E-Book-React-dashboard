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