import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

const AuthContextProvider = props => {

  const [activeUser, setActiveUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const controlAuth = async () => {
      try {
        const { data } = await axios.get('/user/private');
        setActiveUser(data.user);
        setAuth(true);
      } catch (error) {
        setActiveUser({});
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    controlAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, auth, setAuth}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
