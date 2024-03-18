import { createContext, useContext, useState, useEffect } from "react";

const Store = createContext();

export const StoreProvider = ({ children }) => {
  const [user, setuser] = useState("m tayyeb");

  return <Store.Provider value={{ user }}>{children}</Store.Provider>;
};

export const useAuth = () => {
  return useContext(Store);
};
