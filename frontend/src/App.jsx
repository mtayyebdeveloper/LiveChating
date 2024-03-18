import React, { useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import EditorPage from "./pages/EditorPage";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:4000"), []);
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
          <Route path="/editor/:id" element={<EditorPage socket={socket} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
