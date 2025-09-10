import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

 export const AuthProvider = ({children}) =>{

  const [token,setToken] = useState(localStorage.getItem("token"));
  const [user,setUser]= useState("");
  const [isLoading,setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_URL_API;


  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken); // update state so context updates immediately
  };

  let isLoggedIn = !!token;//token hai to true,nahi hai to false
  console.log("is logged in",isLoggedIn);


  //tackling the logout functionality

  const LogoutUser =() =>{
    setToken("");
    return localStorage.removeItem("token");
  };

  //JWT AUTHENTICATION - to get the currently loggedIn user data

  const userAuthentication = async() => {
    try{
      setIsLoading(true);
      const response = await fetch (
        `${API}/api/auth/user`,{
          method:"GET",
          headers : {
            Authorization : authorizationToken,
          }
        },
      
      );

      if(response.ok){
        const data = await response.json();
        console.log("user data",data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }else{
        console.log("Error fetching user data:");
        setIsLoading(false);
      }

    }catch(error){
      console.log("Error fetching user data");
     }
  }
  
  //to fetch services from database
  const getServices = async() => {
    try {
      const response = await fetch(`${API}/api/data/service`,{
        method:"GET",
      });

      if(response.ok){
        const data = await response.json();
        console.log(data.msg);
       setServices(Array.isArray(data.msg) ? data.msg : []);
      }
    } catch (error) {
      console.log(`services frontend error:${error}`);
    }
  }


  useEffect(() => {
    getServices();
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, token,services,authorizationToken , isLoading,API }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authcontextValue=useContext(AuthContext);
    if(!authcontextValue){
      throw new Error("useAuth used outside of the Provider");
    }

  return authcontextValue;
}