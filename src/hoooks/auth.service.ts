import axios from "axios";
import { APIUrl } from "../constants";


const API_URL = APIUrl+"/api/auth/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};



export const login = (username: string, password: string, theFunction: ()=>void, taking:React.Dispatch<React.SetStateAction<string>>) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log("ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
      console.log(response.data.accessToken);
      theFunction();
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        
        taking(""+response.data.accessToken)
      }
      return response.data;
    }).catch((er)=>{
      console.log("ARERRRRRRRRRRRRRRRRRRR");
    })
    ;
};








export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr)
    ;}
  return null;
};
