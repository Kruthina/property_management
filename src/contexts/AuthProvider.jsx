import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { API } from "../config";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    let status = () =>
      new Promise((resolve, reject) => {
        axios
          .post(`${API}/user/login`, data)
          .then((res) => {
            if (res.status == 200) {
              setUser(res.data);
            }
            console.log(res.data);
            resolve(res.status);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    const result = await status();
    console.log(result);
    return result;
  };

  const logout = () => {
    setUser(null);
  };
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
