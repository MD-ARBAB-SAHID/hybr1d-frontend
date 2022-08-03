import React, { createContext, useState,useCallback,useEffect } from "react";
const AuthContext = createContext({
  token: null,
  isLoggedin: false,
  login: () => {},
  logout: () => {},
  uid:null
});
let timer;
export const AuthContextProvider = (props) => {

  const [token, setToken] = useState(null);
  const [uid, setUID] = useState(null);
  const [isLoggedin,setIsLoggedIn] = useState(false);
  const [expiration,setExpiration] = useState();
 
 
  const loginHandler = useCallback((token,id,expirationTime) => {
    setToken(token);
    setUID(id);
    setIsLoggedIn(true);

    const expirationToken = expirationTime || new Date(new Date().getTime() + 5000);
    setExpiration(expirationToken);
    localStorage.setItem("token", token);
    localStorage.setItem("uid", id);
    localStorage.setItem("expirationToken",expirationToken.toISOString());
    
  },[]);
  const logoutHandler = useCallback(() => {
  
    setToken(null);
    setUID(null);
    setIsLoggedIn(false);
    setExpiration(null)
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem('expirationToken');
  },[]);

  useEffect(()=>{
    const intialToken = localStorage.getItem("token");
    const intialStudentId = localStorage.getItem("uid");
    const expirationTime = localStorage.getItem("expirationToken")

    if(intialToken && intialStudentId && new Date(expirationTime)> new Date())
    {
      loginHandler(intialToken,intialStudentId,new Date(expirationTime));
    }else{
      logoutHandler();
    }
  

    },[loginHandler])


    useEffect(()=>{
     
      if(token && expiration)
      {
        


          timer = setTimeout(logoutHandler,expiration.getTime() -new Date().getTime())
      }
      else{
        clearTimeout(timer);
      }
    },[token,expiration,logoutHandler])


  const contextValue = {
    token,
    isLoggedin,
    login: loginHandler,
    logout: logoutHandler,
    uid: uid,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
