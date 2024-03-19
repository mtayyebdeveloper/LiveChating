import { createContext, useContext, useState, useEffect } from "react";

const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [userData, setuserData] = useState("");
  const [token, settoken] = useState(localStorage.getItem("token"));
  const API = import.meta.env.VITE_BACKEND_SITE_NAME;

  const storeTokentoLS = (userToken) => {
    const storage = localStorage.setItem("token", userToken);
    settoken(localStorage.getItem("token"));
    return storage;
  };

  const Logout = () => {
    const storage = localStorage.removeItem("token");
    settoken(localStorage.getItem("token"));
  };

  const UserAuthentication = async () => {
    try {
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      if (response.ok) {
        response.json().then((data) => {
          setuserData(data.allUserData);
        });
      } else {
        console.log(response.json());
      }
    } catch (error) {
      console.log("user Auth error:", error);
    }
  };

  useEffect(() => {
    UserAuthentication();
  }, []);

  return (
    <Store.Provider value={{ storeTokentoLS, token, API, userData, Logout,UserAuthentication }}>
      {children}
    </Store.Provider>
  );
};

export const useAuth = () => {
  return useContext(Store);
};
