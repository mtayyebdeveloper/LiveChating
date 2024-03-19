import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const Login = () => {
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { storeTokentoLS,UserAuthentication, API,token } = useAuth();

  const submitFormData = async () => {
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });

      if (response.ok) {
        response.json().then((data) => {
          if (data.massage) {
            storeTokentoLS(data.jsonWebToken);
            UserAuthentication()
            toast.success(data.massage);
            navigate("/chating");
          } else {
            toast.error(data.error);
          }
        });
      } else {
        response.json().then((err) => {
          if (err.massage.issues) {
            toast.error(err.massage.issues[0].message);
          } else if (err.massage) {
            toast.error(err.massage);
          }
        });
      }
    } catch (error) {
      console.log("login error:", error);
    }
  };
  return (
    <>
     {!token?<>
      <div className="w-[100vw] h-[100vh] bg-gray-700 text-white flex items-center justify-center">
        <div className="border-2 border-white rounded-lg w-[60vw] h-[48vh] bg-gray-800 py-2 px-2 shadow-lg shadow-white">
          <div className="flex items-center pt-3 ps-3">
            <img
              src="download__1_-removebg-preview.png"
              alt="site logo"
              className="w-[60px]"
            />
            <h1 className="text-3xl font-bold">Live' Chats Login</h1>
          </div>
          <div className="mt-[10px] flex flex-col items-center justify-center">
            <div className="flex flex-col mt-2">
              <label htmlFor="phone" className="text-lg py-1 font-bold">
                Enter Your phone number
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                id="phone"
                placeholder="Enter phone"
                className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="password" className="text-lg py-1 font-bold">
                Enter Your password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                id="password"
                placeholder="Enter phone"
                className="w-[50vw] text-lg outline-none px-2 py-1 text-black font-semibold rounded"
              />
            </div>

            <div>
              <button
                className="py-2 px-2 text-center font-semibold text-xl bg-green-500 text-white  border-2 border-green-600 float-right rounded mt-5 cursor-pointer hover:bg-green-700 w-[50vw]"
                onClick={submitFormData}
              >
                Signup
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <Link to="/">
              {" "}
              <p className="hover:underline">
                I don't have account{" "}
                <span className="text-green-500">Signup</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
     </>:navigate("/chating")}
    </>
  );
};

export default Login;
