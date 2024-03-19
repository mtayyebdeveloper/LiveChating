import React, { useEffect } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { Logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      Logout();
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [Logout]);

  return <div></div>;
};

export default Logout;
