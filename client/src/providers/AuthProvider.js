import Axios from "axios";
import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const handleRegister = async (user, history) => {
    try {
      let res = await Axios.post("/api/auth", user);
      setUser(res.data.data);
      history.push("/");
    } catch (err) {
      alert("Error: failed to register");
      debugger;
    }
  };

  const handleLogin = async (user, history) => {
    try {
      let res = await Axios.post("/api/auth/sign_in", user);
      setUser(res.data.data);
      history.push("/");
    } catch (err) {
      alert("Error: failed to log in");
      debugger;
    }
  };

  const handleLogout = async (history) => {
    try {
      let res = await Axios.delete("/api/auth/sign_out");
      setUser(null);
      history.push("/login");
    } catch (err) {
      alert("Error: failed to log out");
      debugger;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleRegister, handleLogin, handleLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
