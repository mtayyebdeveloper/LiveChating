import React, { useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import ChatingPage from "./pages/ChatingPage";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io(`${import.meta.env.VITE_BACKEND_SITE_NAME}`), []);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chating" element={<ChatingPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
