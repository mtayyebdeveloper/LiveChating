import React, { useEffect, useMemo } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import {Signup,Login,Logout,ErrorPage,ChatingPage} from './pages/index.js'

import { io } from "socket.io-client";

const App = () => {
  // const socket = useMemo(() => {
  //   io(`${import.meta.env.VITE_BACKEND_SITE_NAME}`);
  // }, []);

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("connected", socket.id);
    // });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chating" element={<ChatingPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
